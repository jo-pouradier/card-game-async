# Mono-go

A complete rewrite of the original java [Mono backend](../backend/backendmarket-monolithic/)

## Generate swagger documentation

```bash
swag init
# might need:  --parseDependency --parseInternal
# due to gorm dependency
```