import axios from 'axios'

const base: string = 'http://api.cappuchino.scesi.umss.edu.bo/schedule/FCyT/';
let url: string = '';

export function changeUrl (career: string) {
  url = `http://api.cappuchino.scesi.umss.edu.bo/schedule/FCyT/${career}`
}

export async function getCareers () {
  const career = await axios.get(base);
  console.log('-->', career.data)
  return career;
}

export async function numeroDeMaterias(nameTeacher: String): Promise<number> {
  try {
    const horario = await axios.get(url)
    const levels = horario.data.levels
    let count: number = 0
    levels.forEach((level: any) => {
      const subjects = level.subjects
      subjects.forEach((subject: any) => {
        const groups = subject.groups
        groups.forEach((group: any) => {
          if (group.teacher === nameTeacher) count++
        })
      })
    })
    return count
  } catch (error) {
    console.log(error)
  }
  return 0
}

export async function materiasQueDa(nameTeacher: String): Promise<Profesor> {
  try {
    const horario = await axios.get(url)
    const levels = horario.data.levels
    let prof: Profesor = new Profesor()
    levels.forEach((level: any) => {
      const subjects = level.subjects
      subjects.forEach((subject: any) => {
        const groups = subject.groups
        groups.forEach((group: any) => {
          if (group.teacher === nameTeacher) {
            const mat = new Materia(subject.name, group.schedule)
            prof.AgregarMateria(mat)
          }
        })
      })
    })
    return prof
  } catch (error) {
    console.log(error)
  }
  return new Profesor()
}

export async function ListadoDedocentes(): Promise<Set<String>> {
  try {
    const horario = await axios.get(url)
    const levels = horario.data.levels
    const teachers: any = new Set()
    levels.forEach((level: any) => {
      const subjects = level.subjects
      subjects.forEach((subject: any) => {
        const groups = subject.groups
        groups.forEach((group: any) => {
          teachers.add(group.teacher)
        })
      })
    })
    return teachers
  } catch (error) {
    console.log(error)
  }
  return new Set()
}

export class Profesor {
  public materias: Materia[] = []
  public AgregarMateria(materia: Materia) {
    this.materias.push(materia)
  }
  public mostrarMaterias() {
    return this.materias
  }
}
export class Materia {
  constructor(public materia: string, public horarios: Array<any>) {
    this.materia = materia
    this.horarios = horarios
  }
}
