using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ZipCodes",
                columns: table => new
                {
                    zip_code = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    state_abbreviation = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AGI_size = table.Column<int>(type: "int", nullable: false),
                    NumberOfIndividuals = table.Column<int>(type: "int", nullable: false, computedColumnSql: "SUM([number_of_individuals])"),
                    AdjustedGrossIncome = table.Column<int>(type: "int", nullable: false, computedColumnSql: "SUM([adjusted_gross_income])"),
                    TotalIncome = table.Column<int>(type: "int", nullable: false, computedColumnSql: "SUM([total_income_amount])"),
                    TotalSalaryAndWages = table.Column<int>(type: "int", nullable: false, computedColumnSql: "SUM([total_income_amount])"),
                    TaxableIncomeAmount = table.Column<int>(type: "int", nullable: false, computedColumnSql: "SUM([taxable_income_amount])")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ZipCodes", x => x.zip_code);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ZipCodes");
        }
    }
}
