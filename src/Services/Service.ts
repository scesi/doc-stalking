import axios from 'axios'

export async function numeroDeMaterias(nameTeacher: String): Promise<number> {
    try {
        const horario = await axios.get('http://api.cappuchino.scesi.umss.edu.bo/schedule/FCyT/134111')
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

export async function materiasQueDa(nameTeacher: String): Promise<any[]> {
    try {
        const horario = await axios.get('http://api.cappuchino.scesi.umss.edu.bo/schedule/FCyT/134111')
        const levels = horario.data.levels
        let materias: Array<Promise<any>> = []
        levels.forEach((level: any) => {
            const subjects = level.subjects
            subjects.forEach((subject: any) => {
                const groups = subject.groups
                groups.forEach((group: any) => {
                    if (group.teacher === nameTeacher) {
                        materias.push(subject.name)
                    }
                })
            })
        })
        return materias
    } catch (error) {
        console.log(error)
    }
    return []
}

export async function ListadoDedocentes(): Promise<any> {
    try {
        const horario = await axios.get('http://api.cappuchino.scesi.umss.edu.bo/schedule/FCyT/134111')
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
