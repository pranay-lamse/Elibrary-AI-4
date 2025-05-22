<?php

namespace Database\Seeders;

use App\Models\Genre;
use Illuminate\Database\Seeder;

class CreateGenresSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $genres = [
            'Art'              => 'Books that showcase particular types of art.',
            'Biography'        => 'A biography (from the Greek words bios meaning "life", and graphos meaning "write") is a non-fictional account of a person\'s life. Biographies are written by an author who is not the subject/focus of the book. ',
            'Business'         => 'A business (also known as enterprise or firm) is an organization engaged in the trade of goods, services, or both to consumers.',
            'Comics'           => 'A comic book or comicbook, also called comic magazine or simply comic, is a publication that consists of comic art in the form of sequential juxtaposed panels that represent individual scenes.',
            'Contemporary'     => 'Contemporary fiction creates imaginary characters and situations that depict our world
and society. It focuses on themes of growing up and confronting personal and social problems. ',
            'Crime'            => 'Crime fiction is the literary genre that fictionalises crimes, their detection, criminals and their motives.',
            'Fantasy'          => 'Fantasy is a genre that uses magic and other supernatural forms as a primary element of plot, theme, and/or setting. Fantasy is generally distinguished from science fiction and horror by the expectation that it steers clear of technological and macabre themes, respectively, though there is a great deal of overlap between the three (collectively known as speculative fiction or science fiction/fantasy).',
            'Fiction'          => 'Fiction is the telling of stories which are not real. More specifically, fiction is an imaginative form of narrative, one of the four basic rhetorical modes.',
            'Novels'           => '',
            'History'          => 'History (from Greek ἱστορία - historia, meaning "inquiry, knowledge acquired by investigation") is the discovery, collection, organization, and presentation of information about past events. History can also mean the period of time after writing was invented.',
            'Horror'           => 'Horror fiction is fiction in any medium intended to scare, unsettle, or horrify the audience. Historically, the cause of the "horror" experience has often been the intrusion of a supernatural element into everyday human experience.',
            'Humor and Comedy' => '',
            'Music'            => 'Books about music history, music genres and musicians.',
            'Mystery'          => 'The mystery genre is a type of fiction in which a detective, or other professional, solves a crime or series of crimes. It can take the form of a novel or short story.',
            'Nonfiction'       => 'Nonfiction is an account or representation of a subject which is presented as fact. This presentation may be accurate or not; that is, it can give either a true or a false account of the subject in question. ',
            'Philosophy'       => 'Philosophy is the study of general problems concerning matters such as existence, knowledge, truth, beauty, justice, validity, mind, and language. ',
            'Poetry'           => 'Poetry is a form of literary art in which language is used for its aesthetic and evocative qualities in addition to, or in lieu of, its apparent meaning.',
            'Psychology'       => 'Books that involve psychology; the study of mental processes and human behavior.',
            'Religion'         => 'Religion is a cultural system that establishes symbols that relate humanity to spirituality and moral values. Many religions have narratives, symbols, traditions and sacred histories that are intended to give meaning to life or to explain the origin of life or the universe.',
            'Romance'          => 'According to the Romance Writers of America, "Two basic elements comprise every romance novel: a central love story and an emotionally-satisfying and optimistic ending.',
            'Science'          => 'Science (from the Latin scientia, meaning “knowledge”) is the effort to discover, and increase human understanding of how the physical world works.',
            'Self Help'        => 'Self-help, or self-improvement, is a self-guided improvement[1]—economically, intellectually, or emotionally—often with a substantial psychological basis.',
            'Suspense'         => 'Suspense is the element of both fiction and some nonfiction that makes the reader uncertain about the outcome.',
            'Spirituality'     => 'Spirituality may refer to almost any kind of meaningful activity, personal growth, or blissful experience.',
            'Sports'           => 'Sports : engagement in physical activity intended to create a benefit to the participant. Ranging from Amateur to Professional, from incompetent to proficient, for all levels of ability, all nations, all creeds, all genders. As James Joyce said "I am, a stride at a time"',
            'Thriller'         => 'Thrillers are characterized by fast pacing, frequent action, and resourceful heroes who must thwart the plans of more-powerful and better-equipped villains.',
            'Travel'           => 'Travel is the movement of people or objects (such as airplanes, boats, trains and other conveyances) between relatively distant geographical locations.',
            'Economics'        => 'Economics is a social science concerned with the factors that determine the production, distribution, and consumption of goods and services.',
            'Politics'         => 'Politics (from Greek πολιτικός, "of, for, or relating to citizens"), is a process by which groups of people make collective decisions.',
        ];

        foreach ($genres as $genre => $desc) {
            Genre::create(['name' => $genre, 'description' => $desc]);
        }
    }
}
