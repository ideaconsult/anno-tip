/**
 * Tests placeholder for AnnoTip library.
 */
const AnnoTip = require("../");

describe("AnnoTip:", function () {
	describe("Configuration:", function () {
		it("Respects default settings", function () {
			const anno = new AnnoTip({
				classNames: 'big'
			});

			expect(anno.settings.classNames).toBe('big');
			expect(anno.settings.tippySettings.placement).toBe('auto');
		});
	});
});
