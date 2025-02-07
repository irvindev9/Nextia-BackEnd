import db from "../db";
import { User } from "../models/Users";
import { Invitation, Invitations } from "../models/Invitations";

class InvitationController {
  table: string;
  userTable: string;

  constructor() {
      this.table = "invitations";
      this.userTable = "users";
  }

  async createInvitation(invitation: any, email: string): Promise<number | null> {
    const user: User = await db(this.userTable).where({ email }).first();

    const invitation_date = new Date(invitation.invitation_date);
    const expiration_date = new Date(invitation.expiration_date);

    const [id] = await db(this.table).insert({
        ...invitation,
        invitation_date,
        expiration_date,
        code: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
        user_id: user.id,
    });

    return id;
  }

  async getInvitations(page: number, email: string): Promise<{ info: any, data: Invitations } | null> {
    const fixPage: number = (!page) ? 1 : (page < 1) ? 1 : page;

    const total = await db(this.table).count("* as total").first();

    const user: User = await db(this.userTable).where({ email }).first();

    const invitations: Invitations = await db(this.table).select("*").where({ user_id: user.id }).limit(5).offset((fixPage - 1) * 5);

    return { 
      info: {
        page: fixPage,
        totalInvitations: total.total,
        totalPages: Math.ceil(total.total / 5),
      },
      data: invitations,
    };
  }
  async updateInvitation(id: number, invitation: any, email: string): Promise<number | null> {

    const isUserInvitation = await this.verifyUserInvitation(email, id);

    if (!isUserInvitation) {
      return null;
    }

    const user = await db(this.userTable).where({ email }).first();

    const updated = await db(this.table).where({ id }).update({
      name: invitation.name,
      invitation_date: new Date(invitation.invitation_date),
      expiration_date: new Date(invitation.expiration_date),
      user_id: user.id,
    });

    return updated;
  }

  async deleteInvitation(id: number, email: string): Promise<number | null> {

    const isUserInvitation = await this.verifyUserInvitation(email, id);

    if (!isUserInvitation) {
        return null;
    }

    const deleted = await db(this.table).where({ id }).del();

    return deleted;
  }

  async getInvitation(id: number, email: string): Promise<Invitation | null> {
    
    const isUserInvitation = await this.verifyUserInvitation(email, id);

    if (!isUserInvitation) {
        return null;
    }
    
    const invitation: Invitation = await db(this.table).where({ id }).first();

    return invitation;
  }

  async verifyUserInvitation(email: string, invitationId: number): Promise<Invitation | null> {
    const user = await db(this.userTable).where({ email }).first();

    if (!user) {
        return null;
    }

    const invitation: Invitation = await db(this.table).where({ id: invitationId, user_id: user.id }).first();

    if (!invitation) {
        return null;
    }

    return invitation;
  }
}

module.exports = new InvitationController();