# Architekturstrategie Service Page

## Übersicht
Die Architekturstrategie-Seite ist eine umfassende Leistungsseite für INNOQ.com, die die Beratungsleistungen im Bereich Softwarearchitektur präsentiert.

## Struktur

### 1. Hero Section
- **Component**: `image-header`
- **Background**: `bg-image-workshop-03`
- **Content**: Haupttitel und Untertitel mit Fokus auf kontextbezogene Architektur

### 2. Einführungssektion
- **Component**: `page-layout-md--default`
- **Purpose**: Erklärt Architektur als Business-Enabler

### 3. Drei Gründe
- **Component**: `text-card` im `card-grid`
- **Cards**: 
  - Kontinuität
  - Wachstum und Skalierung
  - Kostenoptimierung

### 4. Testimonial
- **Component**: `longquote`
- **Quote**: Zalij Alek Bajda, Head of IT, Fleurop AG

### 5. Warum INNOQ
- **Component**: `big-content-teaser` im `tile-grid-sm`
- **6 Tiles**:
  - Verstehen
  - Pragmatische Entscheidungen
  - Enabling
  - Herstellerunabhängig
  - Langjährige Erfahrungen
  - Ganzheitlichkeit

### 6. Erfolgsgeschichten
- **Component**: `case-tile-teaser` im `masonry-grid`
- **Case Studies**: TELIS, Fleurop, Phoenix Contact

### 7. Methoden
- **Component**: `big-content-teaser` im `tile-grid-sm`
- **Methods**: arc42, Self-contained Systems, Domain-driven Design, aim42, Team Topologies

### 8. Workshop-Portfolio
- **Component**: `case-tile-teaser--sm` im `tile-grid-md`
- **Workshops**: Architektur-Review, Legacy-Modernisierung mit Aim42

### 9. Soziotechnische Systeme
- **Component**: `conclusion`
- **Content**: Wettbewerbsvorteile durch soziotechnische Architekturen

### 10. Tiefer einsteigen
- **Component**: `list-teaser-abstract` und `list-teaser-podcast` im `masonry-grid`
- **Content**: Technology Briefing, Technology Circle, CTOneedToKnow, Technology Day, Agile meets Architecture

### 11. Kontaktbereich
- **Component**: `footer` mit `form--inverted`
- **Purpose**: Kontaktformular für Architekturberatung

## Farbkonzept
- Verwendung von INNOQ-Farben mit verschiedenen Stripes:
  - `stripe--gray`
  - `stripe--gradient-2`
  - `stripe--secondary`
  - `stripe--white`

## Responsive Design
Alle verwendeten Komponenten sind bereits responsive angelegt:
- Container-Klassen sorgen für optimale Breiten
- Grid-Layouts passen sich an verschiedene Bildschirmgrößen an
- Tile-Grids nutzen responsive Breakpoints

## Status
✅ Implementiert und einsatzbereit

## Nächste Schritte
- [ ] Finale Links zu echten Seiten hinzufügen (derzeit Platzhalter "#")
- [ ] Spezifische Hintergrundbilder aus Edition-Serie auswählen
- [ ] Team Topologies Text korrigieren (enthält derzeit doppelten arc42 Text)
- [ ] Legacy-Modernisierung Workshop Text ergänzen ("Text tbd.")
