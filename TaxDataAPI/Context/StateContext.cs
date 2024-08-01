using Azure.Identity;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.SqlServer.Infrastructure.Internal;
using System;
using WebAPI.Models;

namespace TaxDataAPI.Context
{
    public class StateContext : DbContext
    {
        private readonly string _connectionString;
        private readonly DefaultAzureCredential _credential;

        public StateContext(DbContextOptions<StateContext> options)
            : base(options)
        {
            // Load the connection string from configuration
            _connectionString = options.Extensions.OfType<SqlServerOptionsExtension>()
                .FirstOrDefault()?.ConnectionString;

            if (string.IsNullOrEmpty(_connectionString))
            {
                throw new InvalidOperationException("The connection string was not found.");
            }

            _credential = new DefaultAzureCredential();
        }

        public DbSet<State> StateTaxData { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                var token = _credential.GetToken(
                    new Azure.Core.TokenRequestContext(new[] { "https://database.windows.net/.default" }));

                var sqlConnection = new SqlConnection(_connectionString)
                {
                    AccessToken = token.Token
                };

                optionsBuilder.UseSqlServer(sqlConnection);
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<State>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.StateAbbreviation)
                      .IsRequired()
                      .HasColumnName("state_abbreviation");

                entity.Property(e => e.AGISize)
                      .HasColumnName("AGI_size")
                      .IsRequired();

                entity.Property(e => e.NumberOfIndividuals)
                      .HasColumnName("number_of_individuals")
                      .IsRequired();

                entity.Property(e => e.AdjustedGrossIncome)
                      .HasColumnName("adjusted_gross_income")
                      .IsRequired();
            });
        }

    }
}