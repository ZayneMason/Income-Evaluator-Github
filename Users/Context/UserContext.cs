using Microsoft.EntityFrameworkCore;
using UserAPI.Models;

namespace UserAPI.Context
{
    public class UserContext : DbContext
    {
        public UserContext(DbContextOptions<UserContext> options)
            :base (options)
        {
            
        }

        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey("Id");

                entity.Property("Id")
                      .HasColumnName("Id")
                      .IsRequired();

                entity.Property("FirstName")
                      .HasColumnName("FirstName");

                entity.Property("LastName")
                      .HasColumnName("LastName");

                entity.Property("Username")
                      .HasColumnName("Username")
                      .IsRequired();

                entity.Property("Password")
                      .HasColumnName("Password")
                      .IsRequired();
            });
        }
    }
}