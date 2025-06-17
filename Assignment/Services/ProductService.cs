using Dapper;
using Microsoft.Data.SqlClient;
using ProductManagement.Models;

namespace ProductManagement.Services
{
    public class ProductService : IProductService
    {
        private readonly string _connectionString;

        public ProductService(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection")
                ?? throw new ArgumentNullException(nameof(configuration));
        }

        public async Task<IEnumerable<Product>> GetAllProductsAsync()
        {
            const string sql = @"
                SELECT Id, Name, Price, Description, CreatedDate, UpdatedDate 
                FROM Product 
                ORDER BY CreatedDate DESC";

            using var connection = new SqlConnection(_connectionString);
            return await connection.QueryAsync<Product>(sql);
        }

        public async Task<Product?> GetProductByIdAsync(int id)
        {
            const string sql = @"
                SELECT Id, Name, Price, Description, CreatedDate, UpdatedDate 
                FROM Product 
                WHERE Id = @Id";

            using var connection = new SqlConnection(_connectionString);
            return await connection.QueryFirstOrDefaultAsync<Product>(sql, new { Id = id });
        }

        public async Task<int> CreateProductAsync(Product product)
        {
            const string sql = @"
                INSERT INTO Product (Name, Price, Description, CreatedDate, UpdatedDate)
                OUTPUT INSERTED.Id
                VALUES (@Name, @Price, @Description, @CreatedDate, @UpdatedDate)";

            product.CreatedDate = DateTime.Now;
            product.UpdatedDate = DateTime.Now;

            using var connection = new SqlConnection(_connectionString);
            return await connection.QuerySingleAsync<int>(sql, product);
        }

        public async Task<bool> UpdateProductAsync(Product product)
        {
            const string sql = @"
                UPDATE Product 
                SET Name = @Name, 
                    Price = @Price, 
                    Description = @Description, 
                    UpdatedDate = @UpdatedDate
                WHERE Id = @Id";

            product.UpdatedDate = DateTime.Now;

            using var connection = new SqlConnection(_connectionString);
            var rowsAffected = await connection.ExecuteAsync(sql, product);
            return rowsAffected > 0;
        }

        public async Task<bool> DeleteProductAsync(int id)
        {
            const string sql = "DELETE FROM Product WHERE Id = @Id";

            using var connection = new SqlConnection(_connectionString);
            var rowsAffected = await connection.ExecuteAsync(sql, new { Id = id });
            return rowsAffected > 0;
        }
    }
}
