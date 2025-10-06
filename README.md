# 🚀 Ares Scripts Collection

**Professional Plugin Suite for sb0t5 Chat Platform**

![Badges](https://img.shields.io/badge/Free%20%26%20Open%20Source-✓-success) ![Badges](https://img.shields.io/badge/Modular%20Architecture-✓-success) ![Badges](https://img.shields.io/badge/Production%20Ready-✓-success)

## 📖 About This Collection

A comprehensive, modular plugin system for sb0t5 chat platforms. Each script operates independently with event-driven architecture, offering rich formatting, interactive games, user personalization, and powerful moderation tools. Built with performance and maintainability in mind.

---

## 🔧 Core Systems

### Message Processing & Formatting
**Filename:** `ares.js`

Advanced message transformation pipeline that converts proprietary formatting codes to HTML.

- ✅ Color code conversion (14 colors supported)
- ✅ Bold, underline, and combined text styles
- ✅ Emoticon and emoji transformation to images
- ✅ HTML/plain text client compatibility
- ✅ Multi-stage processing pipeline

### Custom Name Management
**Filename:** `customnamekeeper.js`

SQLite-based wardrobe system for persistent custom display names.

- ✅ Multiple names per user with timestamps
- ✅ Interactive menu system (30s timeout)
- ✅ Automatic last-used name restoration
- ✅ Deletion with confirmation

**Commands:**
- `/nombres`
- `/nicks`
- `/guardarropas`
- `/borrar`

### Text Styling & Colors
**Filename:** `autopaint.js`

Comprehensive text styling system with 14 colors and 9 text transformation styles.

- ✅ Named color selection (Spanish/English)
- ✅ Random color generation (avoiding poor visibility colors)
- ✅ 3 text styles: bold, underline, combined
- ✅ 9 text transformations: Leet, Kode, Bonita, Italic, Yayas, Kuulx, Rever, AhLeet, NewLet
- ✅ Registry-based persistence

**Commands:**
- `#cambiar`
- `#rojo`
- `#azul`
- `#estilo 1-3`
- `#letras`
- `#resetcolor`

### Moderation & Rate Limiting
**Filename:** `slowmode.js`

Advanced moderation toolkit with rate limiting and access control.

- ✅ Message throttling with configurable delays
- ✅ Whitelist/blocklist with IP blocking
- ✅ Lockdown mode for room control
- ✅ Admin-only configuration

### Geographic Location Display
**Filename:** `aresflags.js`

Automatic geographic information display using IP geolocation.

- ✅ Real-time IP-to-location lookup (ip-api.com)
- ✅ Unicode flag emoji generation
- ✅ Country and city display
- ✅ Automatic broadcast on user join

---

## 🎮 Interactive Games

### Tuti Fruti Word Game
**Filename:** `tutifruti.js`

Competitive word game with 5 categories and built-in validation database.

- ✅ 5 categories: Names, Animals, Fruits, Countries, Objects
- ✅ 1300+ valid answers database
- ✅ Real-time scoring and rankings
- ✅ Timer-based rounds

### Quiz System
**Filename:** `quiz.js`

Flexible quiz system with file-based question bank.

- ✅ File-based question storage
- ✅ Timer-based state machine
- ✅ Image question support via Scribble API
- ✅ Automatic scoring

### Tarot Card Readings
**Filename:** `tarot.js`

Complete tarot reading system with 22 major arcana cards.

- ✅ 22 major arcana with detailed interpretations
- ✅ Inverted card meanings (30% probability)
- ✅ Specialized readings: Love, Work, General
- ✅ Single card or 3-card spread (Past/Present/Future)

**Commands:**
- `!tarot`
- `!tarot 3`
- `!tarot amor`
- `!tarot trabajo`

---

## 📁 Content Management

### Voting System
**Filename:** `votos.js`

Flexible polling system with binary and multiple-choice options.

- ✅ Binary yes/no polls
- ✅ Multiple-choice voting
- ✅ Admin-controlled access toggle
- ✅ Automatic result calculation
- ✅ 30-second voting window
- ✅ Participation statistics tracking

**Commands:**
- `voto <question>`
- `voto <question>,<opt1>,<opt2>`
- `voteall on/off`
- `votestop`

### Quotes Database
**Filename:** `quotes.js`

SQLite-based quote management system with admin moderation.

- ✅ User-submitted quote storage
- ✅ Random quote retrieval
- ✅ Admin moderation (add/delete)
- ✅ Quote ID-based access

**Commands:**
- `addquote <text>`
- `delquote <id>`
- `quote`
- `quote <id>`

### MOTD Display System
**Filename:** `motd.js, localMotd.js`

Welcome image display system for new users joining the room.

- ✅ Automatic image display on user join
- ✅ Admin-configurable image URLs
- ✅ Persistent storage via Registry
- ✅ Default fallback image support

**Commands:**
- `motd <url>`

### Scribble Image Sharing
**Filename:** `scribbles.js`

URL-based image download and broadcast system.

- ✅ Download images from URLs
- ✅ Room-wide image broadcasting
- ✅ Admin-controlled public access
- ✅ Automatic image display

**Commands:**
- `scribble <url>`
- `scribbleall on/off`

### Image Search Integration
**Filename:** `imgsearch.js`

Google Custom Search API integration for image lookup.

- ✅ Real-time image search via Google API
- ✅ Automatic result display
- ✅ Configurable API key support
- ✅ Error handling and fallbacks

**Commands:**
- `img <search term>`

---

## ⚙️ Technical Highlights

| Feature | Description |
|---------|-------------|
| 🏗️ **Modular Architecture** | Event-driven plugin system with zero inter-script dependencies. Each script operates independently. |
| 💾 **Smart Persistence** | Four storage strategies: Registry, SQLite, File System, and In-Memory, chosen appropriately per use case. |
| 🔒 **Security First** | Parameterized SQL queries, connection checks, and comprehensive error handling throughout. |
| ⚡ **Performance Optimized** | Hybrid memory+database caching, efficient state machines, and minimal resource usage. |
| 🎨 **Rich Formatting** | Multi-stage message transformation pipeline supporting colors, styles, emoticons, and emojis. |
| 🛡️ **Robust Moderation** | Rate limiting, IP blocking, whitelisting, and lockdown mode for complete room control. |

---

## 📥 Get Started

Download the complete Ares Scripts collection and enhance your sb0t5 chat platform today!

[![Download from GitHub](https://img.shields.io/badge/Download-GitHub-blue)](https://github.com/lexicon06/Ares-Scripts)

*Free & Open Source • MIT License • Community Supported*

---

## 📖 Installation Guide

### Quick Start
1. Download the scripts from the GitHub repository
2. Copy the desired `.js` files to your sb0t5 `Scripting` folder
3. Restart your sb0t5 server or reload scripts via admin panel
4. Configure settings using the provided commands (admin access required)
5. Enjoy your enhanced chat platform!

### Requirements
- sb0t5 chat server (compatible with JavaScript scripting)
- Admin access for configuration commands
- SQLite support (for database-backed features)
- Internet connection (for external API features like flags and image search)

### Configuration Tips
- **First-time setup:** Most scripts work out-of-the-box with sensible defaults
- **Database scripts:** Will auto-create necessary database files on first run
- **File-based scripts:** Check the Data folder for configuration files (quiz.txt, etc.)
- **API keys:** Some features (image search) require API key configuration
- **Permissions:** Use admin commands to toggle public access where applicable

---

## 📊 Feature Comparison Matrix

| Feature | Persistence | Admin Only | User Interactive |
|---------|-------------|------------|------------------|
| Message Formatting | None | ❌ | ✅ |
| Custom Names | SQLite | ❌ | ✅ |
| Text Styling | Registry | ❌ | ✅ |
| Slowmode | SQLite | ✅ | ❌ |
| Tuti Fruti Game | In-Memory | ❌ | ✅ |
| Quiz System | File | ⚠️ Toggleable | ✅ |
| Voting System | Registry | ⚠️ Toggleable | ✅ |
| Quotes Database | SQLite | ⚠️ Mixed | ✅ |
| MOTD Display | Registry | ✅ | ❌ |
| Scribble Sharing | None | ⚠️ Toggleable | ✅ |

---

## 🔗 Links

- [GitHub Repository](https://github.com/lexicon06/Ares-Scripts)
- [Report Issues](https://github.com/lexicon06/Ares-Scripts/issues)
- [License](https://github.com/lexicon06/Ares-Scripts/blob/main/LICENSE)

---

**Ares Scripts Collection**  
Created with ❤️ for the sb0t5 community

© 2025 Ares Scripts Collection. All scripts are provided as-is under MIT License.<!DOCTYPE html> 
