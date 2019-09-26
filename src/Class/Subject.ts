import Matter from './Matter'

/*
  code: "1"
  schedule: (2) [{…}, {…}] // Matter
  teacher: "CESPEDES GUIZADA MARIA BENITA"
*/

function mattersFormat (subjects: any[], name: string): Matter[] {
  return subjects.map(item => new Matter(item.code, item.goups, item.teacher, name))
}

class Subject {
  code: string;
  name: string;
  groups: Matter[]
  constructor(code: string, name: string, subjects: any[]) {
    this.code = code;
    this.name = name;
    this.groups = mattersFormat(subjects, name)
  }
}

export default Subject;