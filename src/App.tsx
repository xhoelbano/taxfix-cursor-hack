import { useState } from 'react'
import { useApp } from './store/AppStore'
import { PhoneFrame } from './components/PhoneFrame'
import { TabBar, type TabKey } from './components/TabBar'
import { ToastStack } from './components/Toast'
import { DetectionSheet } from './components/DetectionSheet'
import { HomeScreen } from './screens/HomeScreen'
import { FileScreen } from './screens/FileScreen'
import { SpendScreen } from './screens/SpendScreen'
import { RefundScreen } from './screens/RefundScreen'
import { CoachScreen } from './screens/CoachScreen'

export default function App() {
  const app = useApp()
  const [tab, setTab] = useState<TabKey>('home')
  const [detectId, setDetectId] = useState<string | null>(null)

  const activeEvent = app.pendingDetected.find((d) => d.id === detectId) ?? null

  return (
    <div className="flex min-h-screen items-center justify-center p-4 sm:p-8">
      <div className="flex flex-col items-center gap-5">
        <div className="text-center text-white/80">
          <div className="text-lg font-extrabold lowercase tracking-tight text-lime">taxfix card</div>
          <div className="text-[12px] text-white/50">Get your refund today. Spend it. It pays you back.</div>
        </div>

        <PhoneFrame>
          <ToastStack toasts={app.toasts} />

          <div key={tab} className="no-scrollbar h-full overflow-y-auto pb-28">
            {tab === 'home' && <HomeScreen go={setTab} />}
            {tab === 'file' && <FileScreen go={setTab} />}
            {tab === 'spend' && <SpendScreen onDetect={setDetectId} />}
            {tab === 'refund' && <RefundScreen onOpen={setDetectId} />}
            {tab === 'coach' && <CoachScreen />}
          </div>

          <TabBar
            active={tab}
            onChange={setTab}
            badges={{
              file: app.readyReturns.length || undefined,
              refund: app.pendingDetected.length || undefined,
            }}
          />

          <DetectionSheet
            event={activeEvent}
            onConfirm={(id) => {
              app.confirmDetectedEvent(id)
              setDetectId(null)
              setTab('refund')
            }}
            onDismiss={() => setDetectId(null)}
          />
        </PhoneFrame>
      </div>
    </div>
  )
}
