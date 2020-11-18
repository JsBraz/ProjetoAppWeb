package routes

import (
	// Local imports
	"github.com/JsBraz/ProjetoAppWeb/backend/controllers"

	// Other imports
	"github.com/gin-gonic/gin"
)

// @Summary Recupera as localizações
// @Description Exibe a lista, sem todos os campos, de todas as localizações
// @Accept  json
// @Produce  json
// @Security BearerAuth
// @param Authorization header string true "Token"
// @Success 200 {array} model.Location
// @Router /checkout [get]
// @Failure 404 "Not found"
func GetAllLocations(c *gin.Context) {
	controllers.GetAllLocations(c)
}

// @Summary Recupera uma localização pelo id
// @Description Exibe os detalhes de uma avaliação pelo ID
// @ID get-evaluation-by-int
// @Accept  json
// @Produce  json
// @Security BearerAuth
// @param Authorization header string true "Token"
// @Param id path int true "Evaluation ID"
// @Success 200 {object} model.Location
// @Router /checkout/{id} [get]
// @Failure 404 "Not found"
func GetLocationByID(c *gin.Context) {
	controllers.GetLocationByID(c)
}

// @Summary Atualiza uma avaliação
// @Description Atualiza uma avaliação sobre a utilização da aplicação
// @Accept  json
// @Produce  json
// @Security BearerAuth
// @param Authorization header string true "Token"
// @Param evaluation body model.Location true "Udpdate evaluation"
// @Param id path int true "Evaluation ID"
// @Router /checkout/{id} [put]
// @Success 200 {object} model.Location
// @Failure 400 "Bad request"
// @Failure 404 "Not found"
func UpdateLocation(c *gin.Context) {
	controllers.UpdateLocation(c)
}

// @Summary Exclui uma avaliação pelo ID
// @Description Exclui uma avaliação realizada
// @ID get-string-by-int
// @Accept  json
// @Produce  json
// @Security BearerAuth
// @param Authorization header string true "Token"
// @Param id path int true "Evaluation ID"
// @Router /checkout/{id} [delete]
// @Success 200 {object} model.Location
// @Failure 404 "Not found"
func DeleteLocation(c *gin.Context) {
	controllers.DeleteLocation(c)
}

// @Summary Adicionar uma localização
// @Description Cria uma localização sobre a utilização da aplicação
// @Accept  json
// @Produce  json
// @Security BearerAuth
// @param Authorization header string true "Token"
// @Param location body model.Location true "Add evaluation"
// @Router /checkout [post]
// @Success 201 {object} model.Location
// @Failure 400 "Bad request"
// @Failure 404 "Not found"
func AddLocation(c *gin.Context) {
	controllers.AddLocation(c)
}

// @Summary Recupera todos os usuários
// @Description Devolve todos os usuários presentes no sistema
// @Accept  json
// @Produce  json
// @Security BearerAuth
// @param Authorization header string true "Token"
// @Router /checkout [get]
// @Success 200 {array} model.Users
// @Failure 404 "Not found"
func GetAllUsers(c *gin.Context) {
	controllers.GetAllUsers(c)
}
