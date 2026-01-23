import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import Event from "@/database/event.model";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const formData = await req.formData();

    let event;

    try {
      event = Object.fromEntries(formData.entries());
    } catch (e) {
      return NextResponse.json(
        { message: "Invalid json format" },
        { status: 400 },
      );
    }

    const createdEvent = await Event.create(event);

    return NextResponse.json(
      { message: "Event create successfully", event: createdEvent },
      { status: 201 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Event creation failed",
        error: error instanceof Error ? error.message : "Unknown",
      },
      { status: 500 },
    );
  }
}
