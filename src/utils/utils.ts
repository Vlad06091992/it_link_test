export class ErrorResponse {
  // constructor(errors:[] = [],message:string) {
  constructor(
    private errors: [] = [],
    private message: string,
  ) {}
}

// {
//   "errors": [
//   {
//     "type": "MISSING_PAGINATION_BOUNDADRIES",
//     "path": [
//       "viewer",
//       "gists"
//     ],
//     "locations": [
//       {
//         "line": 4,
//         "column": 5
//       }
//     ],
//     "message": "You must provide a `first` or `last` value to properly paginate the `gists` connection."
//   }
// ]
// }
