using Microsoft.EntityFrameworkCore;
using UserAPI.Models;

namespace UserAPI.Context
{
    public class PersonContext : DbContext
    {
        public PersonContext(DbContextOptions<PersonContext> options)
            : base(options)
        {

        }

        public DbSet<Person> PeopleCollection { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Person>(entity =>
            {
                entity.HasKey("PersonID");

                entity.Property("PersonID")
                      .HasColumnName("PersonID")
                      .IsRequired();

                entity.Property("UserID")
                      .HasColumnName("UserID")
                      .IsRequired();

                entity.Property("FirstName")
                      .HasColumnName("FirstName");

                entity.Property("LastName")
                      .HasColumnName("LastName");

                entity.Property("ZipCode")
                      .HasColumnName("ZipCode")
                      .IsRequired();

                entity.Property("Income")
                      .HasColumnName("Income")
                      .IsRequired();
            });
        }
    }
}