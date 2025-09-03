-- CreateTable
CREATE TABLE "public"."Resume" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "summary" TEXT NOT NULL,

    CONSTRAINT "Resume_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Education" (
    "id" TEXT NOT NULL,
    "institution" TEXT NOT NULL,
    "level" TEXT NOT NULL,
    "from" TIMESTAMP(3) NOT NULL,
    "to" TIMESTAMP(3) NOT NULL,
    "location" TEXT NOT NULL,
    "resumeId" TEXT NOT NULL,

    CONSTRAINT "Education_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Experience" (
    "id" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "organization" TEXT NOT NULL,
    "from" TIMESTAMP(3) NOT NULL,
    "to" TIMESTAMP(3) NOT NULL,
    "location" TEXT NOT NULL,
    "resumeId" TEXT NOT NULL,

    CONSTRAINT "Experience_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Education" ADD CONSTRAINT "Education_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "public"."Resume"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Experience" ADD CONSTRAINT "Experience_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "public"."Resume"("id") ON DELETE CASCADE ON UPDATE CASCADE;
