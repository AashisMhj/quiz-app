-- CreateTable
CREATE TABLE "Topic" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "color" TEXT
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tag_name" TEXT NOT NULL,
    "topic_id" INTEGER,
    CONSTRAINT "Tag_topic_id_fkey" FOREIGN KEY ("topic_id") REFERENCES "Topic" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Question" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "question" TEXT NOT NULL,
    "options" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "revalidate" BOOLEAN NOT NULL DEFAULT false,
    "tag_id" INTEGER NOT NULL,
    "topic_id" INTEGER,
    CONSTRAINT "Question_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "Tag" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Question_topic_id_fkey" FOREIGN KEY ("topic_id") REFERENCES "Topic" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
