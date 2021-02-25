using Microsoft.EntityFrameworkCore.Migrations;

namespace GmapVehicleTracker.Migrations
{
    public partial class myFirsMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "VehicleRouteTracker",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CompanyName = table.Column<string>(type: "varchar(500)", nullable: false),
                    Name = table.Column<string>(type: "varchar(500)", nullable: false),
                    Origin = table.Column<string>(type: "varchar(max)", nullable: false),
                    Destination = table.Column<string>(type: "varchar(max)", nullable: false),
                    Status = table.Column<string>(type: "varchar(100)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VehicleRouteTracker", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "VehicleRouteTracker");
        }
    }
}
