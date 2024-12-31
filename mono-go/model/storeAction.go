package model

type StoreAction int

const (
	BUY StoreAction = iota
	SELL
	GENERATE
)

func (sa StoreAction) String() string {
	return [...]string{"BUY", "SELL", "GENERATE"}[sa]
}
