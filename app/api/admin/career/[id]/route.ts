import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

type Context = {
  params: {
    id: string;
  };
};

// GET — single career profile
export async function GET(
  _req: NextRequest,
  { params }: Context
) {
  try {
    const profile = await prisma.careerProfile.findUnique({
      where: {
        id: params.id,
      },
    });

    if (!profile) {
      return NextResponse.json(
        {
          success: false,
          message: "Career profile not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      profile,
    });
  } catch (error) {
    console.error("Career GET error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to load career profile",
      },
      { status: 500 }
    );
  }
}

// PUT — edit career profile / status
export async function PUT(
  req: NextRequest,
  { params }: Context
) {
  try {
    const body = await req.json();

    const profile = await prisma.careerProfile.update({
      where: {
        id: params.id,
      },
      data: {
        fullName: body.fullName,
        email: body.email,
        phone: body.phone,
        city: body.city,
        role: body.role,
        experience: body.experience,
        skills: body.skills,
        about: body.about,
        portfolio: body.portfolio || null,
        social: body.social || null,
        linkedin: body.linkedin || null,
        availability: body.availability || null,
        workType: body.workType || null,
        resumeUrl: body.resumeUrl || null,
        profilePhotoUrl: body.profilePhotoUrl || null,
        workImages: body.workImages || null,
        status: body.status,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Career profile updated successfully",
      profile,
    });
  } catch (error) {
    console.error("Career PUT error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update career profile",
      },
      { status: 500 }
    );
  }
}

// DELETE — delete career profile
export async function DELETE(
  _req: NextRequest,
  { params }: Context
) {
  try {
    await prisma.careerProfile.delete({
      where: {
        id: params.id,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Career profile deleted successfully",
    });
  } catch (error) {
    console.error("Career DELETE error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete career profile",
      },
      { status: 500 }
    );
  }
}