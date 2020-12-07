package main

import (
	// Local imports
	"github.com/JsBraz/ProjetoAppWeb/backend/model"
	"github.com/JsBraz/ProjetoAppWeb/backend/routes"
	"github.com/JsBraz/ProjetoAppWeb/backend/services"

	// Other imports
	"github.com/gin-gonic/gin"
	_ "github.com/jinzhu/gorm/dialects/postgres"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

var identityKey = "id"

func init() {
	services.OpenDatabase()
	services.Db.AutoMigrate(&model.Location{})
	services.Db.AutoMigrate(&model.Users{})

	defer services.Db.Close()
}

func main() {

	services.FormatSwagger()

	// Creates a gin router with default middleware:
	// logger and recovery (crash-free) middleware
	router := gin.New()
	router.Use(gin.Logger())
	router.Use(gin.Recovery())

	// NO AUTH
	//router.GET("/echo/:echo", routes.EchoRepeat)

	// AUTH
	router.NoRoute(func(c *gin.Context) {
		c.JSON(404, gin.H{"code": "PAGE_NOT_FOUND", "message": "Page not found"})
	})

	checkout := router.Group("/api/v1")
	checkout.Use(services.AuthorizationRequired())
	{
		// Add location (routes.AddLocation)
		checkout.POST("/addLocation", routes.AddLocation)
		// Will be routes.GetAllLocations (devolve localizações e pessoas através de web sockets)
		checkout.GET("/getLocations", routes.GetAllLocations)
		// Get all users (rotes.GetAllUsers)
		checkout.GET("/getUsers", routes.GetAllUsers)
		checkout.GET("/getLocationById/:id", routes.GetLocationByID)
		// Update user (rotes.UpdateUser)
		checkout.PUT("/updateLocation", routes.UpdateLocation)
		// Delete user (rotes.DeleteUser)
		checkout.DELETE("/deleteLocation/:id", routes.DeleteLocation)
	}

	auth := router.Group("/api/v1/auth")
	{
		// devolve admin=true(Admin) or admin=false(Staff)
		auth.POST("/login", routes.GenerateToken)
		auth.POST("/register", routes.RegisterUser)
		auth.PUT("/refresh_token", services.AuthorizationRequired(), routes.RefreshToken)
	}
	router.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))
	router.Run(":8080")
}
