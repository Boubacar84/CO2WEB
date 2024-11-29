#!/bin/bash

GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

if ! command -v sass &> /dev/null
then
    echo -e "${RED}Erreur : Sass n'est pas installé. Veuillez l'installer avec la commande : npm install -g sass${NC}"
    exit 1
fi

INPUT_FILE="sass/main.scss"
OUTPUT_FILE="sass/main.css"

if [ ! -f "$INPUT_FILE" ]; then
    echo -e "${RED}Erreur : Le fichier $INPUT_FILE n'existe pas.${NC}"
    exit 1
fi

echo -e "${GREEN}Compilation de $INPUT_FILE vers $OUTPUT_FILE...${NC}"
sass "$INPUT_FILE" "$OUTPUT_FILE"

if [ $? -eq 0 ]; then
    echo -e "${GREEN}Compilation réussie : $OUTPUT_FILE généré avec succès.${NC}"
else
    echo -e "${RED}Erreur lors de la compilation.${NC}"
    exit 1
fi
