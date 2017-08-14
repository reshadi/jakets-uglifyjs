import * as Fs from "fs";

import * as Jakets from "jakets/lib/Jakets";
import * as Task from "jakets/lib/task/Task";
import * as Uglify from "uglify-js";
// import { } from "jakets/lib/task/FileTask";

export function UglifyTask(
  name: string
  , outputFilename: string
  , inputFilenames: string[]
  , dependencies: Task.TaskDependencies
  , options?: Uglify.MinifyOptions
): Jakets.FileTaskType {
  //Make a copy of all options before changing them
  // options = Object.assign({}, options);

  let depInfo = new Jakets.CommandInfo(<any>{
    Name: name,
    Dependencies: Task.Task.NormalizeDedpendencies(dependencies),
    Files: inputFilenames,
    Options: options,
    Output: outputFilename
  });

  return Jakets.FileTask(depInfo.DependencyFile, depInfo.AllDependencies, async function () {
    depInfo.Write();
    let result = Uglify.minify(
      inputFilenames.map(file => Fs.readFileSync(file, "utf8")),
      options
    );
    Fs.writeFileSync(outputFilename, result.code, { encoding: "utf8" });
  });
}
