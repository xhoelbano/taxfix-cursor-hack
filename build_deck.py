#!/usr/bin/env python3
"""Generate the Taxfix Card pitch deck (Taxfix x Cursor hackathon)."""

from pptx import Presentation
from pptx.util import Inches, Pt, Emu
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE
from pptx.enum.text import MSO_AUTO_SIZE

# ---- Brand palette (from the Taxfix deck screenshots) ----
GREEN = RGBColor(0x14, 0x40, 0x1F)   # deep green
LIME  = RGBColor(0x86, 0xC4, 0x40)   # bright accent green
CREAM = RGBColor(0xF2, 0xEF, 0xE9)   # off-white background
WHITE = RGBColor(0xFF, 0xFF, 0xFF)
INK   = RGBColor(0x1B, 0x2A, 0x1B)   # near-black green text
GRAY  = RGBColor(0x5C, 0x63, 0x5C)   # muted body text
CARD  = RGBColor(0xFF, 0xFF, 0xFF)

FONT = "Helvetica Neue"

prs = Presentation()
prs.slide_width = Inches(13.333)
prs.slide_height = Inches(7.5)
SW, SH = prs.slide_width, prs.slide_height
BLANK = prs.slide_layouts[6]


# ---------- helpers ----------
def slide(bg=CREAM):
    s = prs.slides.add_slide(BLANK)
    r = s.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, SW, SH)
    r.fill.solid(); r.fill.fore_color.rgb = bg
    r.line.fill.background()
    r.shadow.inherit = False
    # send to back
    sp = r._element
    sp.getparent().remove(sp)
    s.shapes._spTree.insert(2, sp)
    return s


def accent_bar(s, color=LIME, w=Inches(0.18)):
    bar = s.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, w, SH)
    bar.fill.solid(); bar.fill.fore_color.rgb = color
    bar.line.fill.background(); bar.shadow.inherit = False


def txt(s, l, t, w, h, text, size, color, bold=False, italic=False,
        align=PP_ALIGN.LEFT, anchor=MSO_ANCHOR.TOP, spacing=1.0, font=FONT):
    tb = s.shapes.add_textbox(l, t, w, h)
    tf = tb.text_frame
    tf.word_wrap = True
    tf.vertical_anchor = anchor
    lines = text.split("\n")
    for i, line in enumerate(lines):
        p = tf.paragraphs[0] if i == 0 else tf.add_paragraph()
        p.alignment = align
        p.line_spacing = spacing
        r = p.add_run(); r.text = line
        f = r.font
        f.size = Pt(size); f.name = font
        f.bold = bold; f.italic = italic
        f.color.rgb = color
    return tb


def card(s, l, t, w, h, fill=CARD, radius=0.08, line=None):
    shp = s.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, l, t, w, h)
    try:
        shp.adjustments[0] = radius
    except Exception:
        pass
    shp.fill.solid(); shp.fill.fore_color.rgb = fill
    if line:
        shp.line.color.rgb = line; shp.line.width = Pt(1)
    else:
        shp.line.fill.background()
    shp.shadow.inherit = False
    return shp


def kicker(s, text, color=LIME, l=Inches(0.7), t=Inches(0.55)):
    txt(s, l, t, Inches(11), Inches(0.4), text.upper(), 15, color, bold=True)


def page(s, n):
    txt(s, SW - Inches(1.1), SH - Inches(0.6), Inches(0.7), Inches(0.4),
        f"{n:02d}", 11, GRAY, align=PP_ALIGN.RIGHT)


# ============================================================
# 1. TITLE
# ============================================================
s = slide(GREEN)
accent_bar(s, LIME)
txt(s, Inches(0.9), Inches(0.7), Inches(6), Inches(0.5),
    "TAXFIX  x  CURSOR  -  HACKATHON", 14, LIME, bold=True)
txt(s, Inches(0.85), Inches(2.2), Inches(11.6), Inches(2.2),
    "Taxfix Card", 76, WHITE, bold=True)
txt(s, Inches(0.9), Inches(3.9), Inches(11), Inches(1.2),
    "Get your refund today. Spend it. It pays you back.", 30, LIME, bold=True)
txt(s, Inches(0.9), Inches(5.1), Inches(10.8), Inches(1.3),
    "Taxfix stops being a once-a-year panic button and becomes the account you "
    "spend from every day - quietly building next year's refund with every purchase.",
    18, RGBColor(0xD9, 0xE6, 0xD0), spacing=1.15)

# ============================================================
# 2. THE PROBLEM
# ============================================================
s = slide(CREAM)
accent_bar(s)
kicker(s, "The problem")
txt(s, Inches(0.7), Inches(1.3), Inches(11.9), Inches(1.5),
    "Tax is a once-a-year panic button.", 40, GREEN, bold=True)
txt(s, Inches(0.7), Inches(2.6), Inches(6.6), Inches(3.5),
    "Germany's hard filing deadline compresses all activity into a few frantic "
    "weeks - then silence for the rest of the year.\n\n"
    "Users feel anxiety, not engagement. A product that could be valuable 12 "
    "months a year is opened once, under stress, then forgotten.",
    20, INK, spacing=1.2)
# stat cards
c1 = card(s, Inches(7.7), Inches(2.7), Inches(4.9), Inches(1.35))
txt(s, Inches(7.95), Inches(2.85), Inches(4.5), Inches(1.1),
    "1x / year", 30, GREEN, bold=True)
txt(s, Inches(7.95), Inches(3.5), Inches(4.5), Inches(0.5),
    "times a typical user opens Taxfix", 14, GRAY)
c2 = card(s, Inches(7.7), Inches(4.25), Inches(4.9), Inches(1.35))
txt(s, Inches(7.95), Inches(4.4), Inches(4.5), Inches(1.1),
    "11 months", 30, GREEN, bold=True)
txt(s, Inches(7.95), Inches(5.05), Inches(4.5), Inches(0.5),
    "of zero engagement and stale data", 14, GRAY)
page(s, 2)

# ============================================================
# 3. THE OPPORTUNITY / INSIGHT
# ============================================================
s = slide(GREEN)
accent_bar(s)
kicker(s, "The insight", color=LIME)
txt(s, Inches(0.7), Inches(1.4), Inches(12), Inches(2.4),
    "Your refund isn't a once-a-year event.\nIt's a balance you earn every day.",
    40, WHITE, bold=True, spacing=1.05)
txt(s, Inches(0.7), Inches(4.0), Inches(11.6), Inches(1.6),
    "Every euro you spend on commuting, working from home, childcare, health or "
    "donations is quietly building next year's refund. What if you could see it "
    "grow - and spend this year's refund today?",
    20, RGBColor(0xD9, 0xE6, 0xD0), spacing=1.2)
page(s, 3)

# ============================================================
# 4. THE IDEA (one line)
# ============================================================
s = slide(CREAM)
accent_bar(s)
kicker(s, "The idea")
txt(s, Inches(0.7), Inches(1.6), Inches(12), Inches(3.5),
    "File once. Taxfix advances your projected refund as a balance you spend "
    "today - and every purchase you make auto-builds next year's refund and "
    "earns cashback.",
    34, GREEN, bold=True, spacing=1.12)
txt(s, Inches(0.7), Inches(5.5), Inches(12), Inches(1),
    "Spending is the engine. The tax work happens in the background.",
    20, GRAY, italic=True)
page(s, 4)

# ============================================================
# 5. HOW IT WORKS - the daily loop
# ============================================================
s = slide(CREAM)
accent_bar(s)
kicker(s, "How it works - the daily loop")
steps = [
    ("1", "Advance", "File once. Your projected ~EUR5,000 refund becomes a spendable balance today."),
    ("2", "Spend", "Use the Taxfix Card for everyday life - groceries, transit, coffee, childcare."),
    ("3", "Auto-tag", "Each purchase is categorized. Deductible ones grow NEXT year's refund + earn cashback."),
    ("4", "Repeat", "Cashback flows back to your balance. Patterns unlock life events & tax-smart deals."),
]
x = Inches(0.7)
cw = Inches(2.95)
gap = Inches(0.18)
for i, (n, title, body) in enumerate(steps):
    lx = Emu(int(x) + i * (int(cw) + int(gap)))
    c = card(s, lx, Inches(1.6), cw, Inches(3.9), fill=GREEN if i % 2 else CARD)
    fg = WHITE if i % 2 else GREEN
    bg = RGBColor(0xD9, 0xE6, 0xD0) if i % 2 else GRAY
    txt(s, Emu(int(lx) + int(Inches(0.25))), Inches(1.85), Inches(2.4), Inches(0.9),
        n, 40, LIME, bold=True)
    txt(s, Emu(int(lx) + int(Inches(0.25))), Inches(2.75), Inches(2.5), Inches(0.6),
        title, 22, fg, bold=True)
    txt(s, Emu(int(lx) + int(Inches(0.25))), Inches(3.4), Inches(2.5), Inches(2.0),
        body, 15, bg, spacing=1.15)
txt(s, Inches(0.7), Inches(5.9), Inches(12), Inches(0.8),
    "No fake urgency. No notification theatre. Just real value on every swipe.",
    17, GREEN, bold=True, italic=True)
page(s, 5)

# ============================================================
# 6-9 FEATURE SLIDES
# ============================================================
def feature(n, kick, headline, body, chip_title, chip_lines, dark=False):
    s = slide(GREEN if dark else CREAM)
    accent_bar(s)
    fg = WHITE if dark else GREEN
    bd = RGBColor(0xD9, 0xE6, 0xD0) if dark else INK
    kicker(s, kick, color=LIME)
    txt(s, Inches(0.7), Inches(1.35), Inches(6.7), Inches(1.9),
        headline, 34, fg, bold=True, spacing=1.05)
    txt(s, Inches(0.7), Inches(3.4), Inches(6.5), Inches(3.2),
        body, 19, bd, spacing=1.2)
    # right visual chip
    c = card(s, Inches(8.0), Inches(1.6), Inches(4.6), Inches(4.4),
             fill=CARD if dark else GREEN)
    ct = GREEN if dark else WHITE
    cl = GRAY if dark else RGBColor(0xD9, 0xE6, 0xD0)
    txt(s, Inches(8.35), Inches(1.95), Inches(4.0), Inches(0.6),
        chip_title.upper(), 14, LIME, bold=True)
    yy = 2.6
    for line in chip_lines:
        big = line.startswith("*")
        text = line[1:] if big else line
        txt(s, Inches(8.35), Inches(yy), Inches(4.0), Inches(0.9),
            text, 26 if big else 15, ct if big else cl, bold=big, spacing=1.1)
        yy += 0.85 if big else 0.55
    page(s, n)


feature(
    6, "Feature 1 - Refund, advanced",
    "Get your refund today,\nnot in six months.",
    "You file once. Taxfix projects your refund and advances a portion to a "
    "spendable balance immediately - the Finanzamt is going to pay it anyway. "
    "No borrowing narrative, no debt guilt: it's your money, early.",
    "Your balance",
    ["Projected 2026 refund", "*EUR5,000", "Available to spend now",
     "*EUR2,400", "Arrives when filing settles"],
)

feature(
    7, "Feature 2 - Auto-built refund + cashback",
    "Every purchase quietly\nbuilds next year's refund.",
    "Swipe the card and each transaction is auto-categorized. Deductible spend "
    "(commute, home office, childcare, health, donations) is added to next "
    "year's refund with a clear '+EUR to your refund' tag - and every purchase "
    "earns cashback that flows back into your balance.",
    "Today's activity",
    ["Groceries  EUR42", "+ EUR0.84 cashback", "Deutsche Bahn  EUR59",
     "*+EUR59 -> 2026 refund", "Home-office day logged"],
    dark=True,
)

feature(
    8, "Feature 3 - Life events, detected",
    "It notices life happening -\nyou don't fill in forms.",
    "Spending patterns reveal life changes. Buy diapers repeatedly and Taxfix "
    "asks 'New baby? Unlock family benefits.' A wedding dress hints at marriage "
    "and joint assessment. One tap to confirm unlocks real deductions - no "
    "questionnaire.",
    "Detected",
    ["Pharmacy + diapers x3", "*New baby?", "Unlock Kindergeld & childcare",
     "*+EUR1,900", "Tap to confirm"],
)

feature(
    9, "Feature 4 - Tax-smart deals",
    "Deals that are actually\nsmart about your taxes.",
    "Because Taxfix knows your commute is long, a car becomes deductible. A "
    "partner BMW lease shows the sticker price AND the effective monthly cost "
    "after the tax deduction - plus the refund uplift. Genuinely useful, "
    "never a nag.",
    "BMW i4 lease - partner offer",
    ["Sticker  EUR549 / mo", "After tax deduction", "*EUR389 / mo",
     "Adds to your refund", "*+EUR1,920 / yr"],
    dark=True,
)

# ============================================================
# 10. WHY IT WINS (judging criteria)
# ============================================================
s = slide(CREAM)
accent_bar(s)
kicker(s, "Why it wins the brief")
crit = [
    ("Value outside filing season", "You open the app daily to spend and earn - not once a year under stress."),
    ("Return loop quality", "Spend -> auto-tag -> refund grows + cashback -> spend again. Intrinsic, not nagging."),
    ("Taxfix brand fit", "You feel financially savvy and in control - 'that grocery run added EUR12 to my refund.'"),
    ("Buzz factor", "'Taxfix advances your refund and every coffee grows next year's.' Tweetable."),
]
positions = [(0.7, 1.55), (6.85, 1.55), (0.7, 3.95), (6.85, 3.95)]
for (title, body), (lx, ty) in zip(crit, positions):
    c = card(s, Inches(lx), Inches(ty), Inches(5.75), Inches(2.15))
    txt(s, Inches(lx + 0.3), Inches(ty + 0.22), Inches(5.2), Inches(0.7),
        title, 20, GREEN, bold=True)
    txt(s, Inches(lx + 0.3), Inches(ty + 0.95), Inches(5.2), Inches(1.1),
        body, 15, GRAY, spacing=1.15)
page(s, 10)

# ============================================================
# 11. WHAT WE'RE NOT DOING
# ============================================================
s = slide(GREEN)
accent_bar(s)
kicker(s, "What we're deliberately NOT doing", color=LIME)
nots = [
    ("No notification theatre", "Value is on the swipe, not in a push alert."),
    ("No fake urgency", "No manufactured deadlines or manipulative streaks."),
    ("No debt-guilt BNPL", "It's your refund, early - framed as unlocking, not borrowing."),
]
for i, (title, body) in enumerate(nots):
    lx = Inches(0.7 + i * 4.1)
    c = card(s, lx, Inches(2.3), Inches(3.8), Inches(2.6), fill=CARD)
    txt(s, Emu(int(lx) + int(Inches(0.3))), Inches(2.6), Inches(3.2), Inches(0.9),
        title, 20, GREEN, bold=True)
    txt(s, Emu(int(lx) + int(Inches(0.3))), Inches(3.55), Inches(3.2), Inches(1.2),
        body, 15, GRAY, spacing=1.15)
txt(s, Inches(0.7), Inches(5.4), Inches(12), Inches(1),
    "The best engagement mechanics are deceptively simple - and honest.",
    19, LIME, bold=True, italic=True)
page(s, 11)

# ============================================================
# 12. DEMO FLOW
# ============================================================
s = slide(CREAM)
accent_bar(s)
kicker(s, "The 45-second demo")
flow = [
    "Open on Home - refund advanced to spend + a small refund already building.",
    "Buy Coffee & Transit - watch cashback land and small '+refund' tags animate.",
    "Buy Diapers - a sheet asks 'New baby?' - confirm - next-year refund jumps + confetti.",
    "Coach surfaces the BMW lease deal from your detected long commute.",
    "Back to Home - both numbers have visibly grown. That loop is the whole pitch.",
]
yy = 1.55
for i, step in enumerate(flow, 1):
    dot = card(s, Inches(0.7), Inches(yy), Inches(0.55), Inches(0.55),
               fill=LIME, radius=0.5)
    txt(s, Inches(0.7), Inches(yy + 0.04), Inches(0.55), Inches(0.5),
        str(i), 20, GREEN, bold=True, align=PP_ALIGN.CENTER)
    txt(s, Inches(1.5), Inches(yy + 0.02), Inches(11), Inches(0.7),
        step, 19, INK, anchor=MSO_ANCHOR.MIDDLE, spacing=1.05)
    yy += 1.02
page(s, 12)

# ============================================================
# 13. CLOSING
# ============================================================
s = slide(GREEN)
accent_bar(s)
txt(s, Inches(0.85), Inches(2.2), Inches(11.6), Inches(2),
    "Make taxes year-round.", 60, WHITE, bold=True)
txt(s, Inches(0.9), Inches(3.7), Inches(11), Inches(1),
    "Get your refund today. Spend it. It pays you back.", 26, LIME, bold=True)
txt(s, Inches(0.9), Inches(4.9), Inches(11), Inches(1.2),
    "Next step: build the clickable Taxfix Card prototype in Cursor - "
    "Home / Spend / Refund / Coach - and demo the daily loop live.",
    18, RGBColor(0xD9, 0xE6, 0xD0), spacing=1.2)

prs.save("Taxfix-Card-Pitch.pptx")
print("Saved Taxfix-Card-Pitch.pptx with", len(prs.slides._sldIdLst), "slides")
