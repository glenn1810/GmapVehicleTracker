
BEGIN

drop table dbo.VehicleRouteTracker

IF (NOT EXISTS (SELECT * 
                 FROM INFORMATION_SCHEMA.TABLES 
                 WHERE TABLE_SCHEMA = 'dbo' 
                 AND  TABLE_NAME = 'VehicleRouteTracker'))

BEGIN
	CREATE TABLE dbo.VehicleRouteTracker
	(
	Id BIGINT IDENTITY(1,1) NOT NULL,
	CompanyName VARCHAR(500) NOT NULL,
	BusName VARCHAR(500) NOT NULL,
	Revenue DECIMAL(9,2) NOT NULL,
	DestinationLat DECIMAL(9,6) NOT NULL,
	DestinationLong DECIMAL(9,6) NOT NULL,
	OriginLat DECIMAL(9,6) NOT NULL,
	OriginLong DECIMAL(9,6) NOT NULL,
	CONSTRAINT [PK_dbo.VehicleRouteTracker] PRIMARY KEY CLUSTERED 
(
    [Id] ASC
)
	)
END


IF (EXISTS (SELECT * 
                 FROM INFORMATION_SCHEMA.TABLES 
                 WHERE TABLE_SCHEMA = 'dbo' 
                 AND  TABLE_NAME = 'VehicleRouteTracker'))

	BEGIN
		TRUNCATE TABLE dbo.VehicleRouteTracker
		INSERT INTO dbo.VehicleRouteTracker
		(
			CompanyName,
			BusName,
			Revenue,
			DestinationLat,
			DestinationLong,
			OriginLat,
			OriginLong
		)
		values
		(
			'A Corp',
			'Bus A',
			899.8,
			14.547160,
			121.054475,
			14.547181,
			121.054583
		)
	
		INSERT INTO dbo.VehicleRouteTracker
		(
			CompanyName,
			BusName,
			Revenue,
			DestinationLat,
			DestinationLong,
			OriginLat,
			OriginLong
		)
		values
		(
			'B Corp',
			'Bus B',
			234.1,
			14.547160,
			121.054475,
			14.547181,
			121.054583
		)

		INSERT INTO dbo.VehicleRouteTracker
		(
			CompanyName,
			BusName,
			Revenue,
			DestinationLat,
			DestinationLong,
			OriginLat,
			OriginLong
		)
		values
		(
			'C Corp',
			'Bus C',
			1500.6,
			14.547160,
			121.054475,
			14.547181,
			121.054583
		)

		INSERT INTO dbo.VehicleRouteTracker
		(
			CompanyName,
			BusName,
			Revenue,
			DestinationLat,
			DestinationLong,
			OriginLat,
			OriginLong
		)
		values
		(
			'D Corp',
			'Bus D',
			900.6,
			14.547160,
			121.054475,
			14.547181,
			121.054583
		)

		INSERT INTO dbo.VehicleRouteTracker
		(
			CompanyName,
			BusName,
			Revenue,
			DestinationLat,
			DestinationLong,
			OriginLat,
			OriginLong
		)
		values
		(
			'E Corp',
			'Bus E',
			1300.4,
			14.547160,
			121.054475,
			14.547181,
			121.054583
		)

		INSERT INTO dbo.VehicleRouteTracker
		(
			CompanyName,
			BusName,
			Revenue,
			DestinationLat,
			DestinationLong,
			OriginLat,
			OriginLong
		)
		values
		(
			'F Corp',
			'Bus F',
			1300.4,
			14.547160,
			121.054475,
			14.547181,
			121.054583
		)

		INSERT INTO dbo.VehicleRouteTracker
		(
			CompanyName,
			BusName,
			Revenue,
			DestinationLat,
			DestinationLong,
			OriginLat,
			OriginLong
		)
		values
		(
			'G Corp',
			'Bus G',
			1600.1,
			14.547160,
			121.054475,
			14.547181,
			121.054583
		)

		INSERT INTO dbo.VehicleRouteTracker
		(
			CompanyName,
			BusName,
			Revenue,
			DestinationLat,
			DestinationLong,
			OriginLat,
			OriginLong
		)
		values
		(
			'F Corp',
			'Bus F',
			1300.4,
			14.547160,
			121.054475,
			14.547181,
			121.054583
		)

		INSERT INTO dbo.VehicleRouteTracker
		(
			CompanyName,
			BusName,
			Revenue,
			DestinationLat,
			DestinationLong,
			OriginLat,
			OriginLong
		)
		values
		(
			'H Corp',
			'Bus H',
			2000.1,
			14.547160,
			121.054475,
			14.547181,
			121.054583
		)

		INSERT INTO dbo.VehicleRouteTracker
		(
			CompanyName,
			BusName,
			Revenue,
			DestinationLat,
			DestinationLong,
			OriginLat,
			OriginLong
		)
		values
		(
			'I Corp',
			'Bus I',
			500.1,
			14.547160,
			121.054475,
			14.547181,
			121.054583
		)

		INSERT INTO dbo.VehicleRouteTracker
		(
			CompanyName,
			BusName,
			Revenue,
			DestinationLat,
			DestinationLong,
			OriginLat,
			OriginLong
		)
		values
		(
			'J Corp',
			'Bus J',
			750.1,
			14.547160,
			121.054475,
			14.547181,
			121.054583
		)
	END
END


