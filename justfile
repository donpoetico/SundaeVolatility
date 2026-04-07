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

# Serve design proofs on localhost:8080
design-proofs port="8080":
    @echo "Serving design proofs at http://localhost:{{port}}"
    @echo "  → color-palette.html"
    @echo "  → scene-layout.html"
    @echo "  → concept-art-briefs.md"
    python3 -m http.server {{port}} --directory design-proofs
