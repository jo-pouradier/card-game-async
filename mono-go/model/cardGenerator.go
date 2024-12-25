package model

// CardGeneratorDTO represents the data needed to generate a card.
type CardGenerator struct {
	DescriptionPrompt string `json:"descriptionPrompt"`
	ImagePrompt       string `json:"imagePrompt"`
	UserID            int    `json:"userId"`
}
