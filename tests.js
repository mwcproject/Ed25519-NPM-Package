// Use strict
"use strict";


// Constants

// Modules
const MODULES = [
	"@mwcproject/ed25519-native",
	"@mwcproject/ed25519-wasm",
	"@mwcproject/ed25519-wasm.asmjs"
];

// Tests
const TESTS = [
	{
	
		// Name
		name: "publicKeyFromSecretKey",
		
		// Paramaters
		parameters: [
		
			// Secret key
			Buffer.from([188, 5, 126, 146, 103, 92, 154, 195, 30, 142, 73, 167, 119, 127, 12, 152, 86, 178, 119, 120, 87, 115, 49, 28, 246, 168, 249, 125, 171, 29, 188, 177])
		],
		
		// Result
		result: Buffer.from([38, 48, 118, 143, 50, 211, 241, 187, 36, 1, 177, 47, 9, 208, 217, 114, 147, 199, 203, 217, 225, 235, 230, 184, 237, 219, 174, 58, 164, 248, 121, 112])
	},
	{
	
		// Name
		name: "sign",
		
		// Paramaters
		parameters: [
		
			// Message
			Buffer.from([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]),
			
			// Secret key
			Buffer.from([188, 5, 126, 146, 103, 92, 154, 195, 30, 142, 73, 167, 119, 127, 12, 152, 86, 178, 119, 120, 87, 115, 49, 28, 246, 168, 249, 125, 171, 29, 188, 177])
		],
		
		// Result
		result: Buffer.from([157, 169, 93, 124, 162, 247, 122, 198, 64, 214, 247, 98, 241, 109, 156, 239, 122, 62, 28, 115, 225, 80, 188, 214, 17, 2, 117, 38, 182, 76, 250, 221, 211, 186, 193, 212, 175, 118, 145, 50, 196, 139, 133, 57, 105, 3, 210, 168, 21, 178, 35, 71, 200, 113, 17, 163, 26, 216, 214, 133, 83, 69, 159, 1])
	},
	{
	
		// Name
		name: "verify",
		
		// Paramaters
		parameters: [
		
			// Message
			Buffer.from([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]),
			
			// Signature
			Buffer.from([157, 169, 93, 124, 162, 247, 122, 198, 64, 214, 247, 98, 241, 109, 156, 239, 122, 62, 28, 115, 225, 80, 188, 214, 17, 2, 117, 38, 182, 76, 250, 221, 211, 186, 193, 212, 175, 118, 145, 50, 196, 139, 133, 57, 105, 3, 210, 168, 21, 178, 35, 71, 200, 113, 17, 163, 26, 216, 214, 133, 83, 69, 159, 1]),
			
			// Public key
			Buffer.from([38, 48, 118, 143, 50, 211, 241, 187, 36, 1, 177, 47, 9, 208, 217, 114, 147, 199, 203, 217, 225, 235, 230, 184, 237, 219, 174, 58, 164, 248, 121, 112])
		],
		
		// Result
		result: true
	}
];


// Main function
(async () => {

	// Go through all modules
	for(let module of MODULES) {
	
		// Check if module uses asm.js
		if(module.endsWith(".asmjs")) {
		
			// Remove WASM support
			WebAssembly = undefined;
			
			// Fix module name
			module = module.substring(0, module.length - ".asmjs".length);
		}
		
		// Load module
		const library = require(module);

		// Go through all tests
		for(const test of TESTS) {
		
			// Check if library implements the test
			if(test.name in library) {
		
				// Run test
				let result = library[test.name](...test.parameters);
				
				// Check if result is a promise
				if(result instanceof Promise) {
				
					// Resolve result
					result = await result;
				}
				
				// Check if result is a Uint8Array
				if(result instanceof Uint8Array && !(result instanceof Buffer)) {
				
					// Make result a buffer
					result = Buffer.from(result);
				}
				
				// Otherwise check if result is an object
				else if(typeof result === "object" && result !== null) {
				
					// Go through all values in the object
					for(const key of Object.keys(result)) {
					
						// Check if value is a Uint8Array
						if(result[key] instanceof Uint8Array && !(result[key] instanceof Buffer)) {
						
							// Make value a buffer
							result[key] = Buffer.from(result[key]);
						}
					}
				}
				
				// Check if result is known
				if("result" in test) {
				
					// Check if results don't have the same type or the results differ
					if(typeof test.result !== typeof result || JSON.stringify(test.result) !== JSON.stringify(result)) {
					
						// Throw error
						throw new Error(`Failed ${test.name} test`);
					}
				}
				
				// Otherwise
				else {
				
					// Check if result is invalid
					if(result === undefined || result === null) {
					
						// Throw error
						throw new Error(`Failed ${test.name} test`);
					}
				}
			}
			
			// Otherwise
			else {
			
				// Display message
				console.log(`Skipping ${test.name} test for ${module} module`);
			}
		}
		
		// Unload module
		delete require.cache[require.resolve(module)];
	}
	
	// Display message
	console.log("Tests passed");
})();
