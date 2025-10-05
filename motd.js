/**
 * MOTD (Message of the Day) Image Management System
 * 
 * This script provides dynamic MOTD image functionality for room administrators.
 * Features include:
 * - Automatic welcome image display for joining users
 * - Admin-configurable image URLs via chat commands
 * - Persistent storage of MOTD settings
 * - Default fallback image
 */

// Script initialization confirmation
print(0, "Motd image script has been loaded successfully.");

// Configuration Constants
var DEFAULT_IMG = 'http://54.37.13.174/motd.png';  // Fallback image URL
var motdDisplay = "";  // Scribble object container for loaded image

/**
 * Retrieve or initialize MOTD image URL from registry
 * Uses persistent storage to maintain settings between script reloads
 */
var motdImage = Registry.getValue("motd") == null ? saveAndReturnKv("motd", DEFAULT_IMG) : Registry.getValue("motd");

/**
 * Save key-value pair to registry and return the value
 * @param {string} key - Registry key identifier
 * @param {string} value - Value to store
 * @returns {string} The stored value
 */
function saveAndReturnKv(key, value) {
    Registry.setValue(key, value);
    return Registry.getValue("motd");
}

/**
 * Handle administrative commands for MOTD management
 * @param {object} userobj - User object executing the command
 * @param {string} command - Full command string
 * @param {string} target - Command target (if applicable)
 * @param {string} extra - Additional command parameters
 */
function onCommand(userobj, command, target, extra) {
    // Verify command format and user permissions (Level 3 = Admin)
    if (command.substring(0, 5).toLowerCase() == "motd " && userobj.level == 3) {
        // Extract and sanitize new image URL from command
        var newMotd = command.substr(5).replace(/ /gi, "");
        
        // Update registry with new MOTD URL
        motdImage = saveAndReturnKv("motd", newMotd);
        
        // Log successful configuration change
        print(0, "The image motd has been replaced successfully to: " + motdImage);
        
        // Reinitialize MOTD with new image URL
        crearMotd();
    }
}

/**
 * Initialize MOTD system on script load
 * Loads and prepares the configured image for display
 */
crearMotd();

/**
 * Handle user join events - display MOTD to new participants
 * @param {object} userobj - User object for joining participant
 */
function onJoin(userobj) {
    // Verify MOTD image is loaded before attempting to display
    if (motdDisplay != "") {
        userobj.scribble(motdDisplay);
    }
}

/**
 * Load and prepare MOTD image for display
 * Creates Scribble object and initiates image download
 */
function crearMotd() {
    var motd = new Scribble();
    
    // Log current image loading operation
    print(0, "Creating motd image with the given picture: " + motdImage);
    
    // Configure Scribble object properties
    motd.src = motdImage;
    
    /**
     * Callback function executed when image download completes
     * Stores the loaded Scribble object for future use
     */
    motd.oncomplete = function(e) {
        motdDisplay = this;
    }
    
    // Initiate image download process
    motd.download();
}
