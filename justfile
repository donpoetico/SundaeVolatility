# Sundae Volatility Task Runner

# Default task: list all commands
default:
    @just --list

# Initialize the project
init:
    npm install

# Run the development server
dev:
    npm run dev

# Run tests
test:
    npm test

# Run linting
lint:
    npm run lint

# Run type checking
type-check:
    npm run type-check

# Run wai doctor
doctor:
    wai doctor

# Check repository health
way:
    wai way
