﻿// <auto-generated />
using GmapVehicleTracker.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace GmapVehicleTracker.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20210302123825_createwayPointdb")]
    partial class createwayPointdb
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.3")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("GmapVehicleTracker.Model.VehicleRouteTracker", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("BusName")
                        .IsRequired()
                        .HasColumnType("varchar(500)");

                    b.Property<string>("CompanyName")
                        .IsRequired()
                        .HasColumnType("varchar(500)");

                    b.Property<decimal>("DestinationLat")
                        .HasColumnType("Decimal(9,6)");

                    b.Property<decimal>("DestinationLong")
                        .HasColumnType("Decimal(9,6)");

                    b.Property<decimal>("OriginLat")
                        .HasColumnType("Decimal(9,6)");

                    b.Property<decimal>("OriginLong")
                        .HasColumnType("Decimal(9,6)");

                    b.Property<decimal>("Revenue")
                        .HasColumnType("decimal(9,2)");

                    b.HasKey("Id");

                    b.ToTable("VehicleRouteTracker");
                });

            modelBuilder.Entity("GmapVehicleTracker.Model.WayPoints", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<decimal>("WayPointLat")
                        .HasColumnType("Decimal(9,6)");

                    b.Property<decimal>("WayPointLong")
                        .HasColumnType("Decimal(9,6)");

                    b.HasKey("Id");

                    b.ToTable("WayPoints");
                });
#pragma warning restore 612, 618
        }
    }
}
