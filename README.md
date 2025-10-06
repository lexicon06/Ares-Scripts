<!DOCTYPE html>  
<html lang="en">  
<head>  
    <meta charset="UTF-8">  
    <meta name="viewport" content="width=device-width, initial-scale=1.0">  
    <title>Ares Scripts Collection for sb0t5 - Free Plugin Suite</title>  
    <style>  
        * {  
            margin: 0;  
            padding: 0;  
            box-sizing: border-box;  
        }  
          
        body {  
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;  
            line-height: 1.6;  
            color: #333;  
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);  
            padding: 20px;  
        }  
          
        .container {  
            max-width: 1200px;  
            margin: 0 auto;  
            background: white;  
            border-radius: 10px;  
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);  
            overflow: hidden;  
        }  
          
        header {  
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);  
            color: white;  
            padding: 60px 40px;  
            text-align: center;  
        }  
          
        header h1 {  
            font-size: 3em;  
            margin-bottom: 10px;  
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);  
        }  
          
        header p {  
            font-size: 1.3em;  
            opacity: 0.9;  
        }  
          
        .badge {  
            display: inline-block;  
            background: rgba(255,255,255,0.2);  
            padding: 8px 16px;  
            border-radius: 20px;  
            margin: 10px 5px;  
            font-size: 0.9em;  
        }  
          
        .content {  
            padding: 40px;  
        }  
          
        .intro {  
            background: #f8f9fa;  
            padding: 30px;  
            border-radius: 8px;  
            margin-bottom: 40px;  
            border-left: 5px solid #667eea;  
        }  
          
        .intro h2 {  
            color: #667eea;  
            margin-bottom: 15px;  
        }  
          
        .category {  
            margin-bottom: 50px;  
        }  
          
        .category h2 {  
            color: #667eea;  
            font-size: 2em;  
            margin-bottom: 20px;  
            padding-bottom: 10px;  
            border-bottom: 3px solid #667eea;  
        }  
          
        .script-card {  
            background: #fff;  
            border: 1px solid #e0e0e0;  
            border-radius: 8px;  
            padding: 25px;  
            margin-bottom: 20px;  
            transition: transform 0.3s, box-shadow 0.3s;  
        }  
          
        .script-card:hover {  
            transform: translateY(-5px);  
            box-shadow: 0 5px 20px rgba(102, 126, 234, 0.3);  
        }  
          
        .script-card h3 {  
            color: #764ba2;  
            font-size: 1.5em;  
            margin-bottom: 10px;  
        }  
          
        .script-card .filename {  
            background: #f0f0f0;  
            padding: 5px 10px;  
            border-radius: 4px;  
            font-family: 'Courier New', monospace;  
            font-size: 0.9em;  
            display: inline-block;  
            margin-bottom: 15px;  
        }  
          
        .script-card ul {  
            list-style: none;  
            padding-left: 0;  
        }  
          
        .script-card ul li {  
            padding: 8px 0;  
            padding-left: 25px;  
            position: relative;  
        }  
          
        .script-card ul li:before {  
            content: "✓";  
            position: absolute;  
            left: 0;  
            color: #667eea;  
            font-weight: bold;  
        }  
          
        .commands {  
            background: #f8f9fa;  
            padding: 15px;  
            border-radius: 5px;  
            margin-top: 15px;  
        }  
          
        .commands h4 {  
            color: #764ba2;  
            margin-bottom: 10px;  
        }  
          
        .command-code {  
            background: #2d2d2d;  
            color: #f8f8f2;  
            padding: 3px 8px;  
            border-radius: 3px;  
            font-family: 'Courier New', monospace;  
            font-size: 0.9em;  
        }  
          
        .features-grid {  
            display: grid;  
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));  
            gap: 20px;  
            margin-top: 30px;  
        }  
          
        .feature-box {  
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);  
            color: white;  
            padding: 25px;  
            border-radius: 8px;  
            text-align: center;  
        }  
          
        .feature-box h3 {  
            margin-bottom: 10px;  
            font-size: 1.3em;  
        }  
          
        footer {  
            background: #2d2d2d;  
            color: white;  
            padding: 30px 40px;  
            text-align: center;  
        }  
          
        footer a {  
            color: #667eea;  
            text-decoration: none;  
        }  
          
        footer a:hover {  
            text-decoration: underline;  
        }  
          
        .download-section {  
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);  
            color: white;  
            padding: 40px;  
            text-align: center;  
            margin: 40px 0;  
            border-radius: 8px;  
        }  
          
        .download-btn {  
            display: inline-block;  
            background: white;  
            color: #667eea;  
            padding: 15px 40px;  
            border-radius: 30px;  
            text-decoration: none;  
            font-weight: bold;  
            font-size: 1.2em;  
            margin-top: 20px;  
            transition: transform 0.3s;  
        }  
          
        .download-btn:hover {  
            transform: scale(1.05);  
        }  
    </style>  
</head>  
<body>  
    <div class="container">  
        <header>  
            <h1>🚀 Ares Scripts Collection</h1>  
            <p>Professional Plugin Suite for sb0t5 Chat Platform</p>  
            <div>  
                <span class="badge">Free & Open Source</span>  
                <span class="badge">Modular Architecture</span>  
                <span class="badge">Production Ready</span>  
            </div>  
        </header>  
          
        <div class="content">  
            <div class="intro">  
                <h2>About This Collection</h2>  
                <p>A comprehensive, modular plugin system for sb0t5 chat platforms. Each script operates independently with event-driven architecture, offering rich formatting, interactive games, user personalization, and powerful moderation tools. Built with performance and maintainability in mind.</p>  
            </div>  
              
            <!-- Core Systems -->  
            <div class="category">  
                <h2>🔧 Core Systems</h2>  
                  
                <div class="script-card">  
                    <h3>Message Processing & Formatting</h3>  
                    <div class="filename">ares.js</div>  
                    <p>Advanced message transformation pipeline that converts proprietary formatting codes to HTML.</p>  
                    <ul>  
                        <li>Color code conversion (14 colors supported)</li>  
                        <li>Bold, underline, and combined text styles</li>  
                        <li>Emoticon and emoji transformation to images</li>  
                        <li>HTML/plain text client compatibility</li>  
                        <li>Multi-stage processing pipeline</li>  
                    </ul>  
                </div>  
                  
                <div class="script-card">  
                    <h3>Custom Name Management</h3>  
                    <div class="filename">customnamekeeper.js</div>  
                    <p>SQLite-based wardrobe system for persistent custom display names.</p>  
                    <ul>  
                        <li>Multiple names per user with timestamps</li>  
                        <li>Interactive menu system (30s timeout)</li>  
                        <li>Automatic last-used name restoration</li>  
                        <li>Deletion with confirmation</li>  
                    </ul>  
                    <div class="commands">  
                        <h4>Commands:</h4>  
                        <span class="command-code">/nombres</span>  
                        <span class="command-code">/nicks</span>  
                        <span class="command-code">/guardarropas</span>  
                        <span class="command-code">/borrar</span>  
                    </div>  
                </div>  
                  
                <div class="script-card">  
                    <h3>Text Styling & Colors</h3>  
                    <div class="filename">autopaint.js</div>  
                    <p>Comprehensive text styling system with 14 colors and 9 text transformation styles.</p>  
                    <ul>  
                        <li>Named color selection (Spanish/English)</li>  
                        <li>Random color generation (avoiding poor visibility colors)</li>  
                        <li>3 text styles: bold, underline, combined</li>  
                        <li>9 text transformations: Leet, Kode, Bonita, Italic, Yayas, Kuulx, Rever, AhLeet, NewLet</li>  
                        <li>Registry-based persistence</li>  
                    </ul>  
                    <div class="commands">  
                        <h4>Commands:</h4>  
                        <span class="command-code">#cambiar</span>  
                        <span class="command-code">#rojo</span>  
                        <span class="command-code">#azul</span>  
                        <span class="command-code">#estilo 1-3</span>  
                        <span class="command-code">#letras</span>  
                        <span class="command-code">#resetcolor</span>  
                    </div>  
                </div>  
                  
                <div class="script-card">  
                    <h3>Moderation & Rate Limiting</h3>  
                    <div class="filename">slowmode.js</div>  
                    <p>Advanced moderation toolkit with rate limiting and access control.</p>  
                    <ul>  
                        <li>Message throttling with configurable delays</li>  
                        <li>Whitelist/blocklist with IP blocking</li>  
                        <li>Lockdown mode for room control</li>  
                        <li>Admin-only configuration</li>  
                    </ul>  
                </div>  
                  
                <div class="script-card">  
                    <h3>Geographic Location Display</h3>  
                    <div class="filename">aresflags.js</div>  
                    <p>Automatic geographic information display using IP geolocation.</p>  
                    <ul>  
                        <li>Real-time IP-to-location lookup (ip-api.com)</li>  
                        <li>Unicode flag emoji generation</li>  
                        <li>Country and city display</li>  
                        <li>Automatic broadcast on user join</li>  
                    </ul>  
                </div>  
            </div>  
              
            <!-- Interactive Games -->  
            <div class="category">  
                <h2>🎮 Interactive Games</h2>  
                  
                <div class="script-card">  
                    <h3>Tuti Fruti Word Game</h3>  
                    <div class="filename">tutifruti.js</div>  
                    <p>Competitive word game with 5 categories and built-in validation database.</p>  
                    <ul>  
                        <li>5 categories: Names, Animals, Fruits, Countries, Objects</li>  
                        <li>1300+ valid answers database</li>  
                        <li>Real-time scoring and rankings</li>  
                        <li>Timer-based rounds</li>  
                    </ul>  
                </div>  
                  
                <div class="script-card">  
                    <h3>Quiz System</h3>  
                    <div class="filename">quiz.js</div>  
                    <p>Flexible quiz system with file-based question bank.</p>  
                    <ul>  
                        <li>File-based question storage</li>  
                        <li>Timer-based state machine</li>  
                        <li>Image question support via Scribble API</li>  
                        <li>Automatic scoring</li>  
                    </ul>  
                </div>  
                  
                <div class="script-card">  
                    <h3>Tarot Card Readings</h3>  
                    <div class="filename">tarot.js</div>  
                    <p>Complete tarot reading system with 22 major arcana cards.</p>  
                    <ul>  
                        <li>22 major arcana with detailed interpretations</li>  
                        <li>Inverted card meanings (30% probability)</li>  
                        <li>Specialized readings: Love, Work, General</li>  
                        <li>Single card or 3-card spread (Past/Present/Future)</li>  
                    </ul>  
                    <div class="commands">  
                        <h4>Commands:</h4>  
                        <span class="command-code">!tarot</span>  
                        <span class="command-code">!tarot 3</span>  
                        <span class="command-code">!tarot amor</span>  
                        <span class="command-code">!tarot trabajo</span>  
                    </div>  
                </div>  
            </div>  
              
            <!-- Content Management -->  
            <div class="category">  
                <h2>📁 Content Management</h2>  
                  
                <div class="script-card">  
                    <h3>Voting System</h3>  
                    <div class="filename">votos.js</div>  
                    <p>Flexible polling system with binary and multiple-choice options.</p>  
                    <ul>  
                        <li>Binary yes/no polls</li>  
                        <li>Multiple-choice voting</li>  
                        <li>Admin-controlled access toggle</li>  
                        <li>Automatic    result calculation</li>  
                        <li>30-second voting window</li>  
                        <li>Participation statistics tracking</li>  
                    </ul>  
                    <div class="commands">  
                        <h4>Commands:</h4>  
                        <span class="command-code">voto &lt;question&gt;</span>  
                        <span class="command-code">voto &lt;question&gt;,&lt;opt1&gt;,&lt;opt2&gt;</span>  
                        <span class="command-code">voteall on/off</span>  
                        <span class="command-code">votestop</span>  
                    </div>  
                </div>  
                  
                <div class="script-card">  
                    <h3>Quotes Database</h3>  
                    <div class="filename">quotes.js</div>  
                    <p>SQLite-based quote management system with admin moderation.</p>  
                    <ul>  
                        <li>User-submitted quote storage</li>  
                        <li>Random quote retrieval</li>  
                        <li>Admin moderation (add/delete)</li>  
                        <li>Quote ID-based access</li>  
                    </ul>  
                    <div class="commands">  
                        <h4>Commands:</h4>  
                        <span class="command-code">addquote &lt;text&gt;</span>  
                        <span class="command-code">delquote &lt;id&gt;</span>  
                        <span class="command-code">quote</span>  
                        <span class="command-code">quote &lt;id&gt;</span>  
                    </div>  
                </div>  
                  
                <div class="script-card">  
                    <h3>MOTD Display System</h3>  
                    <div class="filename">motd.js, localMotd.js</div>  
                    <p>Welcome image display system for new users joining the room.</p>  
                    <ul>  
                        <li>Automatic image display on user join</li>  
                        <li>Admin-configurable image URLs</li>  
                        <li>Persistent storage via Registry</li>  
                        <li>Default fallback image support</li>  
                    </ul>  
                    <div class="commands">  
                        <h4>Commands:</h4>  
                        <span class="command-code">motd &lt;url&gt;</span>  
                    </div>  
                </div>  
                  
                <div class="script-card">  
                    <h3>Scribble Image Sharing</h3>  
                    <div class="filename">scribbles.js</div>  
                    <p>URL-based image download and broadcast system.</p>  
                    <ul>  
                        <li>Download images from URLs</li>  
                        <li>Room-wide image broadcasting</li>  
                        <li>Admin-controlled public access</li>  
                        <li>Automatic image display</li>  
                    </ul>  
                    <div class="commands">  
                        <h4>Commands:</h4>  
                        <span class="command-code">scribble &lt;url&gt;</span>  
                        <span class="command-code">scribbleall on/off</span>  
                    </div>  
                </div>  
                  
                <div class="script-card">  
                    <h3>Image Search Integration</h3>  
                    <div class="filename">imgsearch.js</div>  
                    <p>Google Custom Search API integration for image lookup.</p>  
                    <ul>  
                        <li>Real-time image search via Google API</li>  
                        <li>Automatic result display</li>  
                        <li>Configurable API key support</li>  
                        <li>Error handling and fallbacks</li>  
                    </ul>  
                    <div class="commands">  
                        <h4>Commands:</h4>  
                        <span class="command-code">img &lt;search term&gt;</span>  
                    </div>  
                </div>  
            </div>  
              
            <!-- Technical Highlights -->  
            <div class="category">  
                <h2>⚙️ Technical Highlights</h2>  
                  
                <div class="features-grid">  
                    <div class="feature-box">  
                        <h3>🏗️ Modular Architecture</h3>  
                        <p>Event-driven plugin system with zero inter-script dependencies. Each script operates independently.</p>  
                    </div>  
                      
                    <div class="feature-box">  
                        <h3>💾 Smart Persistence</h3>  
                        <p>Four storage strategies: Registry, SQLite, File System, and In-Memory, chosen appropriately per use case.</p>  
                    </div>  
                      
                    <div class="feature-box">  
                        <h3>🔒 Security First</h3>  
                        <p>Parameterized SQL queries, connection checks, and comprehensive error handling throughout.</p>  
                    </div>  
                      
                    <div class="feature-box">  
                        <h3>⚡ Performance Optimized</h3>  
                        <p>Hybrid memory+database caching, efficient state machines, and minimal resource usage.</p>  
                    </div>  
                      
                    <div class="feature-box">  
                        <h3>🎨 Rich Formatting</h3>  
                        <p>Multi-stage message transformation pipeline supporting colors, styles, emoticons, and emojis.</p>  
                    </div>  
                      
                    <div class="feature-box">  
                        <h3>🛡️ Robust Moderation</h3>  
                        <p>Rate limiting, IP blocking, whitelisting, and lockdown mode for complete room control.</p>  
                    </div>  
                </div>  
            </div>  
              
            <!-- Download Section -->  
            <div class="download-section">  
                <h2>📥 Get Started</h2>  
                <p>Download the complete Ares Scripts collection and enhance your sb0t5 chat platform today!</p>  
                <a href="https://github.com/lexicon06/Ares-Scripts" class="download-btn">Download from GitHub</a>  
                <p style="margin-top: 20px; font-size: 0.9em; opacity: 0.9;">  
                    Free & Open Source • MIT License • Community Supported  
                </p>  
            </div>  
              
            <!-- Installation Guide -->  
            <div class="category">  
                <h2>📖 Installation Guide</h2>  
                  
                <div class="script-card">  
                    <h3>Quick Start</h3>  
                    <ol style="list-style: decimal; padding-left: 20px;">  
                        <li style="padding: 10px 0;">Download the scripts from the GitHub repository</li>  
                        <li style="padding: 10px 0;">Copy the desired .js files to your sb0t5 <code style="background: #f0f0f0; padding: 2px 6px; border-radius: 3px;">Scripting</code> folder</li>  
                        <li style="padding: 10px 0;">Restart your sb0t5 server or reload scripts via admin panel</li>  
                        <li style="padding: 10px 0;">Configure settings using the provided commands (admin access required)</li>  
                        <li style="padding: 10px 0;">Enjoy your enhanced chat platform!</li>  
                    </ol>  
                </div>  
                  
                <div class="script-card">  
                    <h3>Requirements</h3>  
                    <ul>  
                        <li>sb0t5 chat server (compatible with JavaScript scripting)</li>  
                        <li>Admin access for configuration commands</li>  
                        <li>SQLite support (for database-backed features)</li>  
                        <li>Internet connection (for external API features like flags and image search)</li>  
                    </ul>  
                </div>  
                  
                <div class="script-card">  
                    <h3>Configuration Tips</h3>  
                    <ul>  
                        <li><strong>First-time setup:</strong> Most scripts work out-of-the-box with sensible defaults</li>  
                        <li><strong>Database scripts:</strong> Will auto-create necessary database files on first run</li>  
                        <li><strong>File-based scripts:</strong> Check the Data folder for configuration files (quiz.txt, etc.)</li>  
                        <li><strong>API keys:</strong> Some features (image search) require API key configuration</li>  
                        <li><strong>Permissions:</strong> Use admin commands to toggle public access where applicable</li>  
                    </ul>  
                </div>  
            </div>  
              
            <!-- Feature Matrix -->  
            <div class="category">  
                <h2>📊 Feature Comparison Matrix</h2>  
                  
                <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">  
                    <thead>  
                        <tr style="background: #667eea; color: white;">  
                            <th style="padding: 12px; text-align: left; border: 1px solid #ddd;">Feature</th>  
                            <th style="padding: 12px; text-align: center; border: 1px solid #ddd;">Persistence</th>  
                            <th style="padding: 12px; text-align: center; border: 1px solid #ddd;">Admin Only</th>  
                            <th style="padding: 12px; text-align: center; border: 1px solid #ddd;">User Interactive</th>  
                        </tr>  
                    </thead>  
                    <tbody>  
                        <tr style="background: #f8f9fa;">  
                            <td style="padding: 12px; border: 1px solid #ddd;">Message Formatting</td>  
                            <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">None</td>  
                            <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">❌</td>  
                            <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">✅</td>  
                        </tr>  
                        <tr>  
                            <td style="padding: 12px; border: 1px solid #ddd;">Custom Names</td>  
                            <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">SQLite</td>  
                            <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">❌</td>  
                            <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">✅</td>  
                        </tr>  
                        <tr style="background: #f8f9fa;">  
                            <td style="padding: 12px; border: 1px solid #ddd;">Text Styling</td>  
                            <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">Registry</td>  
                            <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">❌</td>  
                            <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">✅</td>  
                        </tr>  
                        <tr>  
                            <td style="padding: 12px; border: 1px solid #ddd;">Slowmode</td>  
                            <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">SQLite</td>  
                            <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">✅</td>  
                            <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">❌</td>  
                        </tr>  
                        <tr style="background: #f8f9fa;">  
                            <td style="padding: 12px; border: 1px solid #ddd;">Tuti Fruti Game</td>  
                            <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">In-Memory</td>  
                            <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">❌</td>  
                            <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">✅</td>  
                        </tr>  
                        <tr>  
                            <td style="padding: 12px; border: 1px solid #ddd;">Quiz System</td>  
                            <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">File</td>  
                            <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">⚠️ Toggleable</td>  
                            <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">✅</td>  
                        </tr>  
                        <tr style="background: #f8f9fa;">  
                            <td style="padding: 12px; border: 1px solid #ddd;">Voting System</td>  
                            <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">Registry</td>  
                            <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">⚠️ Toggleable</td>  
                            <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">✅</td>  
                        </tr>  
                        <tr>  
                            <td style="padding: 12px; border: 1px solid #ddd;">Quotes Database</td>  
                            <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">SQLite</td>  
                            <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">⚠️ Mixed</td>  
                            <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">✅</td>  
                        </tr>  
                        <tr style="background: #f8f9fa;">  
                            <td style="padding: 12px; border: 1px solid #ddd;">MOTD Display</td>  
                            <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">Registry</td>  
                            <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">✅</td>  
                            <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">❌</td>  
                        </tr>  
                        <tr>  
                            <td style="padding: 12px; border: 1px solid #ddd;">Scribble Sharing</td>  
                            <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">None</td>  
                            <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">⚠️ Toggleable</td>  
                            <td style="padding: 12px; text-align: center; border: 1px solid #ddd;">✅</td>  
                        </tr>  
                    </tbody>  
                </table>  
            </div>  
        </div>  
          
        <footer>  
            <h3>Ares Scripts Collection</h3>  
            <p style="  margin-top: 10px;">  
                Created with ❤️ for the sb0t5 community  
            </p>  
            <p style="margin-top: 15px;">  
                <a href="https://github.com/lexicon06/Ares-Scripts">GitHub Repository</a> •   
                <a href="https://github.com/lexicon06/Ares-Scripts/issues">Report Issues</a> •   
                <a href="https://github.com/lexicon06/Ares-Scripts/blob/main/LICENSE">License</a>  
            </p>  
            <p style="margin-top: 20px; font-size: 0.85em; opacity: 0.7;">  
                © 2024 Ares Scripts Collection. All scripts are provided as-is under MIT License.  
            </p>  
        </footer>  
    </div>  
</body>  
</html>
