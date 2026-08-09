# Reglas de ramificación — luanapp

## Ramas principales

| Rama | Propósito | Deploy |
|------|-----------|--------|
| `main` | Producción — código estable | vía GitHub Actions al pushear un tag |
| `dev` | Integración — código en desarrollo | No deploy, solo testing |

## Flujo de trabajo

```
dev ──→ feat/nueva-funcionalidad ──→ PR → dev ──→ test ──→ main ──→ tag ──→ deploy
```

## Reglas

1. **Toda nueva funcionalidad, fix o chore parte de `dev`**
   ```bash
   git checkout dev
   git pull origin dev
   git checkout -b feat/descripcion
   ```

2. **Nombres de rama por tipo**
   - `feat/` — nueva funcionalidad
   - `fix/` — corrección de bug
   - `chore/` — mantenimiento, dependencias, refactor
   - `ui/` — cambios visuales / UX

3. **Pull Request obligatorio a `dev`**
   - El PR debe tener título descriptivo
   - Usar squash merge
   - No mergear directo sin PR

4. **Merge a `main` solo desde `dev`**
   ```bash
   git checkout main
   git merge dev
   git push origin main
   git tag -a vX.Y.Z -m "descripcion"
   git push origin vX.Y.Z
   ```

5. **Nunca pushear directo a `main` o `dev`**
   - `main` solo recibe merges desde `dev`
   - `dev` solo recibe merges desde PRs
