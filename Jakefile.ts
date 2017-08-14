import "jakets/Jakefile";
import * as Jakets from "jakets/lib/Jakets";
import * as Tsc from "jakets/lib/TscTask";

import { UglifyTask } from "./lib/UglifyjsTask";
let MakeRelative = Jakets.CreateMakeRelative(__dirname);

namespace("uglify", () => {
  Jakets.GlobalTask(
    "test"
    , [
      UglifyTask(
        "uglify"
        , Jakets.BuildDir + "/compile/all.js"
        , [Jakets.BuildDir + "/compile/Main.js"]
        , [
          Tsc.TscTask(
            "tsc"
            , [MakeRelative("./tests/Main.ts")]
            , []
            , {
              outDir: "build/compile",
              module: Tsc.ModuleKind.ES2015,
              target: Tsc.ScriptTarget.ES5
            }
          )
        ]
        , {
        }
      )
    ]
    , async () => {
      require("./" + Jakets.BuildDir + "/compile/all");
    }
  );
});