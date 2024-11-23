<svelte:head>
    <title>Frequently Asked Questions (FAQ)</title>
</svelte:head>

<script>
    import '../../style/faq/faq.less';
    import { ColorsToAvoid } from '$lib/data/fashionOptions';

    let questions = [
        {
            question: 'Why is your wedding 2 days long?',
            answer: `We are honored to be sharing an intercultural experience with you, as I (Deep, of Indian cultural descent) and I (Kelly, of American cultural descent) have the opportunity to honor the cultures in which we grew up, by dedicating a day to each half. Our western ceremony will take place on Feb 1st and the Indian ceremony on Feb 2nd.`
        },
        {
            question: 'Where is the wedding?',
            answer: `On Saturday, the western wedding is taking place at Stonebrae Country Club in Hayward, California (202 Country Club Dr, Hayward, CA 94542) On Sunday, the Indian wedding is taking place at Oasis Palace in Newark, California (35145 Newark Blvd, Newark, CA 94560). Please check the schedule tab for specific timing of when to arrive for each day!`
        },
        {
            question: 'What time is the wedding?',
            answer: `On Saturday, the opening ceremony begins at 11AM. On Sunday, the opening ceremony begins at 2PM. Please check the schedule tab for other important timing related details for each day!`
        },
        {
            question: 'What time should I arrive?',
            answer: `For both Saturday + Sunday we recommend that you aim to arrive about 15-30 minutes before the starting ceremonies to ensure you are seated on time! Please check the schedule tab for specific timing of when the ceremonies start for each day!`
        },
        {
            question: 'What is the dress code?',
            answer: `We’d love to see our friends + family get dressed up for our big day. The minimum dress code is formal attire. Given that our wedding is multiple days + multicultural, we are inviting our guests to share in the expression of the cultures through what they wear. If you are curious as to what that looks like for traditionally formal western or Indian attire please visit our <a href='/fashion'>fashion</a> tab on the website! This page will also detail what NOT to wear!`
        },
        {
            question: 'Are there any colors I should avoid wearing?',
            answer: ``,
            displayColors: true
        },
        {
            question: 'What will the weather be?',
            answer: `February is very unpredictable! Let’s pray for perfect weather. However, please come prepared for temperatures ranging from high of 65 degrees and a possible low of 40 degrees!`
            // Be a bit more specific with units + formatting
        },
        {
            question: 'Will the wedding be outdoors?',
            answer: `For Saturday, we are planning to spend the ceremony outdoors and the reception following indoors. But given that February is unpredictable, we have made indoor accommodations if rain decides to join us on our special day. For Sunday, all aspects of this special day will be spent indoors.`
        },
        {
            question: 'Can I bring a date?',
            answer: `Due to limited space, we are only able to accommodate those guests formally invited on your wedding invitation. If you have received a plus one they will appear under your name when you RSVP. Thank you for understanding!`
        },
        {
            question: 'Are kids welcome?',
            answer: `Invitations will be specified and will include the names of the children who are invited!`
        },
        {
            question: 'Where should I stay for the weekend?',
            answer: `In order to accommodate all of our guest’s various accommodation preferences and budgets, we encourage you to check out our travel tab on our website! We have detailed a ton of information + recommendations on where to stay.`
        },
        {
            question: 'Will there be an open bar?',
            answer: `For both Saturday and Sunday we have opted for an alcohol-free wedding, but are excited to offer all other drink types free of charge!`
        },
        {
            question: 'I have a food allergy / preference. Can I make a special request?',
            answer: `For both dates we will be offering options for those with allergies, sensitivities, and specified dietary restrictions so if you fall into any of these categories please indicate this in your RSVP so we can accommodate accordingly!`
        },
        {
            question: 'How do I RSVP?',
            answer: `Please use the <a href='/rsvp'>RSVP tab</a> on the website! We ask that you kindly RSVP by December 21st.`
        },
        {
            question: 'When should I RSVP by?',
            answer: `Please RSVP no later than December 21st using the <a href='/rsvp'>RSVP tab</a> on the website! If you do not RSVP in time, we will assume that you are unable to attend.`
        },
        {
            question: 'What if I don’t RSVP by the deadline?',
            answer: `If we do not receive an RSVP back from you by our December 21st deadline, you will be marked “not attending”. The reason for this being that we must provide accurate guest counts to all of our vendors within a timely manner.`
        },
        {
            question: 'What do I do if I can’t make it?',
            answer: `You will be missed! If you cannot make it to the wedding, please let us know as soon as possible + RSVP as “not attending” so we can plan accordingly. Thank you!`
        },
        {
            question: 'How can I contribute to your honeymoon fund?',
            answer: `The greatest gift of all is your presence on our special day! However, should you wish to contribute to our honeymoon, please refer to the <a href='/registry'>registry tab</a> on the website where it is clearly labeled!`
        },
        {
            question: 'How are you doing gifts?',
            answer: `The greatest gift of all is your presence on our special day! However, should you wish to send gifts our way, please refer to the <a href='/registry'>registry tab</a> on the website!`
        },
        {
            question: 'Who can I contact if I have questions between now and the day of the wedding?',
            answer: `For any and all questions, comments, or concerns regarding the wedding feel free to reach out to us at deepandkelly@gmail.com or 530-220-7692.`
        }
    ];
</script>

<div class="content-box">
    <header class="header" style="margin-bottom: 0;">
        <h1>Frequently Asked Questions</h1>
    </header>
    <div class="faq">
        {#each questions as {question, answer, displayColors}}
                <div class="question">{question}</div>
            <div class="answer">{@html answer}</div>
            {#if displayColors}
                <div class="color-tile-container">
                    <div class="tiles">
                        {#each ColorsToAvoid['Western Formal'] as color}
                            <div class="color-tile" style="background-color: {color.cssColor}">{color.color}</div>
                        {/each}
                    </div>
                </div>
                <p class='please-avoid'>(Saturday)</p>
                <div class="color-tile-container">
                    <div class="tiles">
                        {#each ColorsToAvoid['Indian'] as color}
                            <div class="color-tile" style="background-color: {color.cssColor}">{color.color}</div>
                        {/each}
                    </div>
                </div>
                <p class='please-avoid'>(Sunday)</p>
            {/if}
        {/each}
    </div>
</div>
