using Microsoft.EntityFrameworkCore.Migrations;

namespace GmapVehicleTracker.Migrations
{
    public partial class createwayPointdb : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "WayPoints",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    WayPointLat = table.Column<decimal>(type: "Decimal(9,6)", nullable: false),
                    WayPointLong = table.Column<decimal>(type: "Decimal(9,6)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WayPoints", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "WayPoints");
        }
    }
}
