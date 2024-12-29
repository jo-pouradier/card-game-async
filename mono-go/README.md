# Mono-go

A complete rewrite of the original java [Mono backend](../backend/backendmarket-monolithic/)

## Generate swagger documentation

```bash
# install swag 
go get -u github.com/swaggo/swag/cmd/swag
# generate swagger documentation
swag init
# might need:  --parseDependency --parseInternal
# due to gorm dependency
```

## Rewrite

- [ ] Rewrite the original java backend
  - [ ] Verify queue names (especially for the generation ...{TYPE}... queue)