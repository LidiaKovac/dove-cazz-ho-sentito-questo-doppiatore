interface ICompare {
  doppiatore: string,
  name: string,
  works: ICompareWork[]
}

interface ICompareWork {
  work: string,
  character: string,
  characterImg: string
}
