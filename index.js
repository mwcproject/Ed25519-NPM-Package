// Use strict
"use strict";

// Try
try {

	// Export Ed25519 React Native module
	module["exports"] = require("@mwcproject/ed25519-react");
}

// Catch errors
catch(error) {

	// Try
	try {
	
		// Export Ed25519 Node.js addon
		module["exports"] = require("@mwcproject/ed25519-native");
	}
	
	// Catch errors
	catch(error) {
	
		// Export Ed25519 WASM wrapper
		module["exports"] = require("@mwcproject/ed25519-wasm");
	}
}
