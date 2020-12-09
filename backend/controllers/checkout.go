package controllers

import (
	// Local imports
	"github.com/JsBraz/ProjetoAppWeb/backend/model"
	"github.com/JsBraz/ProjetoAppWeb/backend/services"

	// Other imports
	"net/http"

	"github.com/gin-gonic/gin"
)

func Echo(c *gin.Context) {
	echo := c.Param("echo")

	c.JSON(http.StatusOK, gin.H{
		"echo": echo,
	})
}

func GetAllLocations(c *gin.Context) {
	var locations []model.Location

	services.Db.Find(&locations)

	if len(locations) <= 0 {
		c.JSON(http.StatusNotFound, gin.H{"status": http.StatusNotFound, "message": "None found!"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"status": http.StatusOK, "data": locations})
}

func GetLocationByID(c *gin.Context) {
	var location model.Location
	id := c.Param("id")

	services.Db.First(&location, id)
	if location.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"status": http.StatusNotFound, "message": "Location not found!"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"status": http.StatusOK, "data": location})
}

func UpdateLocation(c *gin.Context) {
	var location model.Location

	if err := c.ShouldBindJSON(&location); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"status": http.StatusBadRequest, "message": "Check syntax!"})
		return
	}

	counter := location.People
	services.Db.First(&location, location.ID)

	if location.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"status": http.StatusNotFound, "message": "Location not found!"})
		return
	}

	services.Db.Model(&location).Update("people", counter)
	c.JSON(http.StatusOK, gin.H{"status": http.StatusOK, "message": "Update succeeded!"})
}

func AddLocation(c *gin.Context) {
	var location model.Location

	if err := c.ShouldBindJSON(&location); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"status": http.StatusBadRequest, "message": "Check syntax!"})
		return
	}
	services.Db.Save(&location)
	c.JSON(http.StatusCreated, gin.H{"status": http.StatusCreated, "message": "Create successful!", "resourceId": location.ID, "location": location})
}

func DeleteLocation(c *gin.Context) {
	var location model.Location

	id := c.Param("id")
	services.Db.First(&location, id)

	if location.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"status": http.StatusNotFound, "message": "None found!"})
		return
	}

	services.Db.Delete(&location)
	c.JSON(http.StatusOK, gin.H{"status": http.StatusOK, "message": "Delete succeeded!"})
}

func DeleteUser(c *gin.Context) {
	var user model.Users

	id := c.Param("id")
	services.Db.First(&user, id)

	if user.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"status": http.StatusNotFound, "message": "None found!"})
		return
	}

	services.Db.Delete(&user)
	c.JSON(http.StatusOK, gin.H{"status": http.StatusOK, "message": "Delete succeeded!"})
}

func GetAllUsers(c *gin.Context) {

	var users []model.Users

	services.Db.Find(&users)

	if len(users) <= 0 {
		c.JSON(http.StatusNotFound, gin.H{"status": http.StatusNotFound, "message": "None found!"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"status": http.StatusOK, "data": users})
}
