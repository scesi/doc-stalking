import Subject from './Subject'

class Level {
  code: string = '';
  subjects: Subject[];
  constructor(code: string, subjects: Subject[]) {
    this.code = code;
    this.subjects = subjects
  }
}

export default Level;