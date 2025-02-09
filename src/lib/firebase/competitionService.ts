// lib/competitionService.ts
import { db, storage } from './firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, doc, setDoc, updateDoc, getDoc } from 'firebase/firestore';
import { Competition } from '@/models/Competition';
import { Team } from '@/models/Team';

export const competitionService = {
  // Team Registration
  async registerTeam(
    competitionId: string, 
    teamData: Omit<Team, 'id' | 'stages' | 'registrationStatus' | 'createdAt'>,
    registrationFile: File
  ) {
    const teamId = crypto.randomUUID();
    const storageRef = ref(storage, `registrations/${teamId}/${registrationFile.name}`);
    
    // Upload registration file
    await uploadBytes(storageRef, registrationFile);
    const registrationDocURL = await getDownloadURL(storageRef);
    
    // Create team document
    const team: Team = {
      id: teamId,
      ...teamData,
      registrationStatus: 'pending',
      registrationDocURL,
      stages: {
        1: { status: 'pending' },
        2: { status: 'pending' },
        3: { status: 'pending' }
      },
      createdAt: new Date()
    };
    
    await setDoc(doc(db, 'teams', teamId), team);
    return team;
  },

  // Stage Submission
  async submitStageWork(
    teamId: string,
    stageNumber: number,
    submissionFile: File
  ) {
    const team = await getDoc(doc(db, 'teams', teamId));
    const teamData = team.data() as Team;
    
    // Check if previous stage is cleared
    if (stageNumber > 1 && teamData.stages[stageNumber - 1].status !== 'cleared') {
      throw new Error('Previous stage not cleared');
    }
    
    const storageRef = ref(storage, `submissions/${teamId}/stage${stageNumber}/${submissionFile.name}`);
    await uploadBytes(storageRef, submissionFile);
    const submissionURL = await getDownloadURL(storageRef);
    
    await updateDoc(doc(db, 'teams', teamId), {
      [`stages.${stageNumber}`]: {
        status: 'pending',
        submissionURL,
        submissionDate: new Date()
      }
    });
  }
};

// Admin functions
export const adminService = {
  // Update competition details
  async updateCompetition(competitionId: string, updates: Partial<Competition>) {
    await updateDoc(doc(db, 'competitions', competitionId), {
      ...updates,
      updatedAt: new Date()
    });
  },

  // Update team registration status
  async updateRegistrationStatus(
    teamId: string,
    status: 'approved' | 'rejected'
  ) {
    await updateDoc(doc(db, 'teams', teamId), {
      registrationStatus: status,
      updatedAt: new Date()
    });
  },

  // Update stage clearance
  async updateStageClearance(
    teamId: string,
    stageNumber: number,
    status: 'cleared' | 'rejected',
    feedback?: string
  ) {
    await updateDoc(doc(db, 'teams', teamId), {
      [`stages.${stageNumber}.status`]: status,
      [`stages.${stageNumber}.feedback`]: feedback,
      updatedAt: new Date()
    });
  },

  // Update stage guideline
  async updateStageGuideline(
    competitionId: string,
    stageNumber: number,
    guidelineFile: File,
    description: string
  ) {
    const storageRef = ref(storage, `guidelines/${competitionId}/stage${stageNumber}/${guidelineFile.name}`);
    await uploadBytes(storageRef, guidelineFile);
    const guidelineFileURL = await getDownloadURL(storageRef);
    
    await updateDoc(doc(db, 'competitions', competitionId), {
      [`stages.${stageNumber}.guidelineFileURL`]: guidelineFileURL,
      [`stages.${stageNumber}.description`]: description,
      updatedAt: new Date()
    });
  }
};