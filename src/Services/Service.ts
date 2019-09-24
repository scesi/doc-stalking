import axios from 'axios'
const url: string = 'http://api.cappuchino.scesi.umss.edu.bo/schedule/FCyT/134111'

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

export async function ListadoDedocentes(): Promise<any> {
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

class Profesor {
    public materias: Array<Materia> = []
    public AgregarMateria(materia: Materia) {
        this.materias.push(materia)
    }
    public mostrarMaterias() {
        return this.materias
    }
}
class Materia {
    constructor(public materia: string, public horarios: Array<any>) {
        this.materia = materia
        this.horarios = horarios
    }
}
