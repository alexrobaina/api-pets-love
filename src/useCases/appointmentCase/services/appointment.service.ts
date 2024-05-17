import { PrismaClient, Appointment } from '@prisma/client'

const prisma = new PrismaClient()

export const createAppointment = async (
  data: Omit<Appointment, 'id' | 'createdAt' | 'updatedAt'>,
  ownerId: string,
): Promise<Appointment> => {
  const { startDate, endDate, petId, recipientId, ...rest } = data

  const isoEndDate = endDate && new Date(endDate).toISOString()
  const isoStartDate = startDate && new Date(startDate).toISOString()

  return prisma.appointment.create({
    data: {
      ...rest,
      petId,
      ownerId,
      recipientId,
      startDate: isoStartDate,
      endDate: isoEndDate,
    },
  })
}

export const updateAppointment = async (
  id: string,
  data: Partial<Appointment>,
): Promise<Appointment | null> => {
  const { endDate, startDate, ...rest } = data

  const isoEndDate = endDate && new Date(endDate).toISOString()
  const isoStartDate = startDate && new Date(startDate).toISOString()

  const filterInvalidValues = (data: Record<string, any>) => {
    return Object.fromEntries(
      Object.entries(data).filter(
        ([_, value]) => value !== null && value !== '',
      ),
    )
  }

  const filteredData = filterInvalidValues(rest)

  return prisma.appointment.update({
    where: { id },
    data: {
      ...filteredData,
      startDate: isoEndDate,
      endDate: isoStartDate,
      petId: data?.petId || null,
      recipientId: data?.recipientId || null,
    },
  })
}

export const deleteAppointment = async (
  id: string,
): Promise<Appointment | null> => {
  return prisma.appointment.delete({
    where: { id },
  })
}

export const getAppointmentById = async (
  id: string,
): Promise<Appointment | null> => {
  return prisma.appointment.findUnique({
    where: { id },
    include: {
      pet: true,
    },
  })
}

export const listAppointments = async (query: any): Promise<Appointment[]> => {
  return prisma.appointment.findMany(query)
}
