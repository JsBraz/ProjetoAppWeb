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

func GetAllEvaluations(c *gin.Context) {
	var locations []model.location

	services.Db.Find(&locations)

	if len(locations) <= 0 {
		c.JSON(http.StatusNotFound, gin.H{"status": http.StatusNotFound, "message": "None found!"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"status": http.StatusOK, "data": evaluations})
}

func GetEvaluationByID(c *gin.Context) {
	var location model.Location
	id := c.Param("id")

	services.Db.First(&location, id)
	if location.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"status": http.StatusNotFound, "message": "Evaluation not found!"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"status": http.StatusOK, "data": evaluation})
}

func UpdateEvaluation(c *gin.Context) {
	var location model.Location

	id := c.Param("id")
	services.Db.First(&location, id)

	if location.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"status": http.StatusNotFound, "message": "Evaluation not found!"})
		return
	}

	if err := c.ShouldBindJSON(&location); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"status": http.StatusBadRequest, "message": "Check request!"})
		return
	}

	services.Db.Save(location)
	c.JSON(http.StatusOK, gin.H{"status": http.StatusOK, "message": "Update succeeded!"})
}

func AddEvaluation(c *gin.Context) {
	var location model.Location

	if err := c.ShouldBindJSON(&location); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"status": http.StatusBadRequest, "message": "Check syntax!"})
		return
	}
	services.Db.Save(&location)
	c.JSON(http.StatusCreated, gin.H{"status": http.StatusCreated, "message": "Create successful!", "resourceId": location.ID})
}

func DeleteEvaluation(c *gin.Context) {
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

func GetAllUsers(c *gin.Context) {

}
