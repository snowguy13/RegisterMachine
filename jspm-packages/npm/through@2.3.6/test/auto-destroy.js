/* */
"format cjs";var test=require("tape"),through=require("../index");test("end before close",function(e){var t=through();t.autoDestroy=!1;var n=!1,r=!1;t.on("end",function(){e.ok(!r),n=!0}),t.on("close",function(){e.ok(n),r=!0}),t.write(1),t.write(2),t.write(3),t.end(),e.ok(n),e.notOk(r),t.destroy(),e.ok(r),e.end()});
//# sourceMappingURL=auto-destroy.js.map