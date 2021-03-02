using Microsoft.EntityFrameworkCore.Migrations;

namespace GmapVehicleTracker.Migrations
{
    public partial class initialUpdate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Destination",
                table: "VehicleRouteTracker");

            migrationBuilder.DropColumn(
                name: "Origin",
                table: "VehicleRouteTracker");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "VehicleRouteTracker");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "VehicleRouteTracker",
                newName: "BusName");

            migrationBuilder.AddColumn<decimal>(
                name: "DestinationLat",
                table: "VehicleRouteTracker",
                type: "Decimal(9,6)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "DestinationLong",
                table: "VehicleRouteTracker",
                type: "Decimal(9,6)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "OriginLat",
                table: "VehicleRouteTracker",
                type: "Decimal(9,6)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<decimal>(
                name: "OriginLong",
                table: "VehicleRouteTracker",
                type: "Decimal(9,6)",
                nullable: false,
                defaultValue: 0m);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DestinationLat",
                table: "VehicleRouteTracker");

            migrationBuilder.DropColumn(
                name: "DestinationLong",
                table: "VehicleRouteTracker");

            migrationBuilder.DropColumn(
                name: "OriginLat",
                table: "VehicleRouteTracker");

            migrationBuilder.DropColumn(
                name: "OriginLong",
                table: "VehicleRouteTracker");

            migrationBuilder.RenameColumn(
                name: "BusName",
                table: "VehicleRouteTracker",
                newName: "Name");

            migrationBuilder.AddColumn<string>(
                name: "Destination",
                table: "VehicleRouteTracker",
                type: "varchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Origin",
                table: "VehicleRouteTracker",
                type: "varchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "VehicleRouteTracker",
                type: "varchar(100)",
                nullable: false,
                defaultValue: "");
        }
    }
}
