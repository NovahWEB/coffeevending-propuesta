#!/usr/bin/env bash
# Publica esta carpeta en GitHub Pages (NovahWEB/coffeevending-propuesta).
# → https://novahweb.github.io/coffeevending-propuesta/
#
# La llave SSH de este entorno es un deploy key de OTRO proyecto, así que el push va por HTTPS
# con el token de `gh`. Ver la memoria del workspace: gotcha-git-push-llave-ajena.
set -euo pipefail
cd "$(dirname "$0")"
git init -q -b main 2>/dev/null || true
git add -A
git -c user.name='NovahWeb' -c user.email='danieltejera07@gmail.com' commit -q -m "${1:-actualizar la propuesta}" || echo "(sin cambios)"
git remote remove origin 2>/dev/null || true
git remote add origin "https://x-access-token:$(gh auth token)@github.com/NovahWEB/coffeevending-propuesta.git"
git push -qf origin main
echo "OK → https://novahweb.github.io/coffeevending-propuesta/"
