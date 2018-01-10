using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace ceesto.Data
{
    public class MoviesContext : DbContext
    {
        public DbSet<Movie> Movies { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite("Data Source=scratch\\movies.db");
        }
    }
}